import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthen = false
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthen = this.authService.getIsAuthen()
    this.authService.getAuthListen().subscribe(authen=>{
      this.isAuthen=authen
    })
  }

  logout(){
    this.authService.logout()
  }
}
