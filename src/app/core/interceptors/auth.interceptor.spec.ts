import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthStore } from '../global-store/auth/auth.store';
import { Router } from '@angular/router';

describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authStore: any;
  let router: any;

  beforeEach(() => {
    authStore = {
      refreshSession: vi.fn(),
      logout: vi.fn()
    };
    router = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthStore, useValue: authStore },
        { provide: Router, useValue: router }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add withCredentials to requests', () => {
    httpClient.get('/test').subscribe();
    const req = httpTestingController.expectOne('/test');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });

  it('should skip refresh logic for login and refresh endpoints', () => {
    httpClient.post('/api/v1/auth/login', {}).subscribe({
      error: () => {} // Ignore error
    });
    const req = httpTestingController.expectOne('/api/v1/auth/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    
    expect(authStore.refreshSession).not.toHaveBeenCalled();
  });

  it('should attempt silent refresh on 401', async () => {
    authStore.refreshSession.mockResolvedValue({ email: 'test@example.com' });
    
    const responsePromise = new Promise(resolve => {
      httpClient.get('/api/data').subscribe(resolve);
    });
    
    const req = httpTestingController.expectOne('/api/data');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    
    // Wait for the async refreshSession to be called and resolved
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(authStore.refreshSession).toHaveBeenCalledWith(true);

    // After refreshSession, it should retry the original request
    const retryReq = httpTestingController.expectOne('/api/data');
    expect(retryReq.request.withCredentials).toBe(true);
    retryReq.flush({ success: true });

    const response = await responsePromise;
    expect(response).toEqual({ success: true });
  });

  it('should logout and redirect to login on refresh failure', async () => {
    authStore.refreshSession.mockRejectedValue(new Error('Refresh failed'));
    
    const errorPromise = new Promise(resolve => {
      httpClient.get('/api/data').subscribe({
        error: resolve
      });
    });
    
    const req = httpTestingController.expectOne('/api/data');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    
    // Wait for the async refreshSession call
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(authStore.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);

    const error: any = await errorPromise;
    expect(error.message).toBe('Refresh failed');
  });

  it('should queue multiple 401 requests and retry them after one refresh', async () => {
    authStore.refreshSession.mockResolvedValue({ email: 'test@example.com' });
    
    const res1Promise = new Promise(resolve => httpClient.get('/api/data1').subscribe(resolve));
    const res2Promise = new Promise(resolve => httpClient.get('/api/data2').subscribe(resolve));
    
    const req1 = httpTestingController.expectOne('/api/data1');
    const req2 = httpTestingController.expectOne('/api/data2');
    
    req1.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    req2.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    
    // Wait for the async refreshSession call
    await new Promise(resolve => setTimeout(resolve, 10));

    // refreshSession should be called only once
    expect(authStore.refreshSession).toHaveBeenCalledTimes(1);

    // Both should be retried
    const retryReq1 = httpTestingController.expectOne('/api/data1');
    const retryReq2 = httpTestingController.expectOne('/api/data2');
    
    retryReq1.flush({ data: 1 });
    retryReq2.flush({ data: 2 });

    const res1 = await res1Promise;
    const res2 = await res2Promise;
    expect(res1).toEqual({ data: 1 });
    expect(res2).toEqual({ data: 2 });
  });
});
