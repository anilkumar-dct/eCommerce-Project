import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        console.warn(val.url);
      }
    });
  }
}
