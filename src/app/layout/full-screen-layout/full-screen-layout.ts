import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full-screen-layout',
  imports: [RouterOutlet],
  templateUrl: './full-screen-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenLayout {}
