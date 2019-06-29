import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.css']
})
export class CardShopComponent implements OnInit {

  constructor(public router: Router,public dataService:DataServiceService) { }

  ngOnInit() {
    this.dataService.getCardsShop().subscribe((res)=>{this.cardList = res.json().cards;})
    this.dataService.getPlayerInfo(localStorage.getItem("userId"),localStorage.getItem("accessToken")).subscribe((res)=>{this.playerInfo = res.json();})
  }

  playerInfo;
  cardList = [];

  goToMenu() { 
    this.router.navigate(['welcome']);
  }

  zoomedCard;
  zoomed = false;

  selectedCard;

  selectCard(card){
    this.selectedCard = card;
  }

  buyCard(nameOfCard){
    let requestOBJ = {
      action:"buyCard",
      cardBought: nameOfCard
    }
    this.dataService.buyCard(requestOBJ,localStorage.getItem("accessToken")).subscribe((res)=>{if(res){console.log(res);document.getElementById("successWarning").innerHTML = "Card successfully purchased."}},(err)=>{if(err){document.getElementById("successWarning").innerHTML = "Card was not purchased."}});
  }
  
}
