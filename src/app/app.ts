import { Component, signal } from '@angular/core';
import { StarterIntakeComponent } from "./starter-intake/starter-intake";

@Component({
  selector: 'app-root',
  imports: [StarterIntakeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cypress');
}
