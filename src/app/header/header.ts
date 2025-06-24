import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menuType: string = 'default';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url == '/seller/home' || val.url == '/home') {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
}
