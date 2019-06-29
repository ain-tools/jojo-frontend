import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public router: Router,public dataService:DataServiceService) { }

  ngOnInit() {
    if(localStorage.getItem("accessToken")){
      this.isUserLoggedIn = true;
    }
  }

  isUserLoggedIn = false;

  logout(){
    let ignore;
    let accessToken = localStorage.getItem("accessToken");
    this.dataService.logout(accessToken,ignore).subscribe((res)=>{localStorage.clear();location.reload();},(err)=>{localStorage.clear();location.reload();});
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToHeroSelection(){
    this.router.navigate(['selection']);
  }

  goToCardShop(){
    this.router.navigate(['shop']);
  }

}
