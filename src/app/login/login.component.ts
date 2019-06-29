import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public dataService: DataServiceService) { }

  ngOnInit() {
  }

  toggleRegistration = false;

  toggleToRegister() {
    this.toggleRegistration = !this.toggleRegistration;
  }

  goToMenu() {
    this.router.navigate(['welcome']);
  }

  errorWarning = false;
  response; 

  login(username, password) {
    let userOBJ = {
      username: username,
      password: password
    }
    //@ts-ignore
    this.dataService.login(userOBJ).subscribe((res) => { let accessToken = JSON.parse(res._body).id;localStorage.setItem("accessToken",accessToken);let userId = JSON.parse(res._body).userId;localStorage.setItem("userId",userId);this.router.navigate(['welcome']) }, (err) => { this.errorWarning = true; this.response = JSON.parse(err._body).error.message; });
  }

  register(username, password, repeatPassword) {
    if (password == repeatPassword) {
      let userOBJ = {
        username: username,
        password: password
      }
      this.dataService.registerNewAccount(userOBJ).subscribe((res)=>{this.toggleToRegister();},(err)=>{ this.errorWarning = true; this.response = JSON.parse(err._body).error.message; })
    }else{
      this.errorWarning = true;
    }
  }

}
