import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Welcome to Product Management</h1>
      <p>Use the navigation bar to explore the app</p>
    </div>
  `,
  styles: []
})
export class HomeComponent {}