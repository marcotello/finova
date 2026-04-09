export * from './auth.service';
import { AuthService } from './auth.service';
export * from './health.service';
import { HealthService } from './health.service';
export const APIS = [AuthService, HealthService];
