import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Random } from "random-js";

@Component({
  selector: 'app-hero-selection',
  templateUrl: './hero-selection.component.html',
  styleUrls: ['./hero-selection.component.css']
})
export class HeroSelectionComponent implements OnInit {

  constructor(public router: Router, public dataService: DataServiceService) { }

  ngOnInit() {
    if (!localStorage.getItem("accessToken")) {
      this.createRandomAccount();
    } else {
      this.getPlayerInfo();
    }
    this.dottedLoading();
  }

  warningText;

  createRandomAccount() {
    const random = new Random();
    const userNum = random.integer(10000, 99999);
    const generatePass = random.integer(100000, 999999);
    let userOBJ = {
      username: "Guest#" + userNum,
      password: generatePass + "",
      email: "fakeEmail" + userNum + "@" + "fakemail.com"
    }
    this.dataService.registerNewAccount(userOBJ).subscribe((res) => { this.login(userOBJ) })
  };

  login(userOBJ) {
    //@ts-ignore
    this.dataService.login(userOBJ).subscribe((res) => { let accessToken = JSON.parse(res._body).id; localStorage.setItem("accessToken", accessToken); let userId = JSON.parse(res._body).userId; localStorage.setItem("userId", userId); this.getPlayerInfo(); })
  }

  playerInfo;

  getPlayerInfo() {
    this.dataService.getPlayerInfo(localStorage.getItem("userId"), localStorage.getItem("accessToken")).subscribe((res) => { this.playerInfo = res.json();if(this.playerInfo.gameroomId){localStorage.setItem("gameroomId",this.playerInfo.gameroomId);this.cancelQueue();}; this.getCardDetails(); this.cancelQueue(); localStorage.setItem("playerInfo",JSON.stringify(this.playerInfo)); })
  }

  getCardDetails() {
    let requestObject = {
      action: "getDeckDetails"
    }
    this.dataService.buyCard(requestObject, localStorage.getItem("accessToken")).subscribe((res) => { this.detailedCards = res.json().detailedCards; });
  }

  detailedCards;

  goToMenu() {
    this.router.navigate(['welcome']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  removeFromDeck = false;
  pastCardSelected = [];
  isCardNotSelected = false;
  amountOfCardsSelected = 0;

  selectCard(name, element) {
    for (let i = 0; i < this.pastCardSelected.length; i++) {
      if (this.pastCardSelected[i] == name) {
        let requestObject = {
          action: "unselectCard",
          selectedCard: name
        }
        this.dataService.selectCardToDeck(requestObject, localStorage.getItem("accessToken")).subscribe((res) => { });
        this.isCardNotSelected = true;
        this.pastCardSelected.splice(i, 1);
        element.style.borderStyle = "inset";
        element.style.borderColor = "white";
        element.style.borderWidth = "4px";
        this.amountOfCardsSelected = this.amountOfCardsSelected - 1;
      }
    }
    if (!this.isCardNotSelected) {
      let requestObject = {
        action: "selectCardToDeck",
        selectedCard: name
      }
      this.amountOfCardsSelected = this.amountOfCardsSelected + 1;
      this.dataService.selectCardToDeck(requestObject, localStorage.getItem("accessToken")).subscribe((res) => { });
      this.pastCardSelected.push(name);
      this.isCardNotSelected = false;
      element.style.border = "inset black";
      element.style.borderWidth = "4px";
    }
    this.isCardNotSelected = false;
  }

  dottedLoading() {
    let counter = 0;
    setInterval(() => {
      if (document.getElementsByClassName("worthyOpp")[0]) {
        if (counter == 4) {
          document.getElementsByClassName("worthyOpp")[0].innerHTML = "Searching for a worthy opponent";
          counter = 0;
        }
        document.getElementsByClassName("worthyOpp")[0].innerHTML += ".";
        counter = counter + 1;
      }
    }, 1000);
  }

  inQueue = false;

  queueForGame() {
    if (this.amountOfCardsSelected != 12) {
      this.warningText = "Please select 12 cards.";
      setTimeout(() => { this.warningText = ""; }, 5000);
    }
    if (this.heroDetails == undefined) {
      this.warningText = "Please select a hero.";
      setTimeout(() => { this.warningText = ""; }, 5000);
    }
    let requestOBJ = {
      action: "queueForGame"
    }
    this.dataService.queueJoin(requestOBJ, localStorage.getItem("accessToken")).subscribe((res) => {
      this.queueView("view");
      console.log("queued");
    });
  }

  cancelQueue() {
    let requestOBJ = {
      action: "cancelQueue"
    }
    this.dataService.queueJoin(requestOBJ, localStorage.getItem("accessToken")).subscribe((res) => { this.queueView("cancel"); });
  }

  interval;
  gameroomId;

  viewInterval() {
    this.interval = setInterval(() => {
      this.dataService.queueView(localStorage.getItem("accessToken")).subscribe((res) => {
        if (res.json().gameroomId && res.json().gameroomId != "Finished") {
          clearInterval(this.interval);
          this.gameroomId = res.json().gameroomId;
          localStorage.setItem("gameroomId", this.gameroomId);
          this.router.navigate(['board']);
        }
      });
    }, 2000)
  }

  queueView(option) {
    if (option == "view") {
      this.inQueue = true;
      this.viewInterval();
    } else if (option == "cancel") {
      this.inQueue = false;
      clearInterval(this.interval);
    }
  }

  fullBodyIMGUrl;
  heroDetails;

  selectHero(selectedHero) {
    let requestOBJ = {
      action: "selectHero",
      heroSelected: selectedHero
    };
    this.dataService.selectCardToDeck(requestOBJ, localStorage.getItem("accessToken")).subscribe((res) => {
      this.fullBodyIMGUrl = "../../assets/fullBodyHero/" + selectedHero + ".png"; this.heroDetails = res.json().heroDetails;
    });
  }

}
