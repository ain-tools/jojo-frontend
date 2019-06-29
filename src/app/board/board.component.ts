import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public router: Router, public dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.gameroomView(localStorage.getItem("gameroomId"), localStorage.getItem("accessToken")).subscribe((res) => { this.gameroomObject = res.json(); this.sortCardsOfDeck(); this.getHpPercentageOfHero(); this.getManaPercentageOfHero(); this.timer(); });
    this.getPlayerInfo();
    this.gameView();
  }

  adjustCardPosition() {
    setTimeout(() => {
      if (this.laidCardsHero.length == 1) {
        document.getElementById("laidCardElement1").style.marginLeft = "45vw";
      } else if (this.laidCardsHero.length == 2) {
        document.getElementById("laidCardElement1").style.marginLeft = "40vw";
        document.getElementById("laidCardElement2").style.marginLeft = "50vw";
      } else if (this.laidCardsHero.length == 3) {
        document.getElementById("laidCardElement1").style.marginLeft = "35vw";
        document.getElementById("laidCardElement2").style.marginLeft = "45vw";
        document.getElementById("laidCardElement3").style.marginLeft = "55vw";
      } else if (this.laidCardsHero.length == 4) {
        document.getElementById("laidCardElement1").style.marginLeft = "30vw";
        document.getElementById("laidCardElement2").style.marginLeft = "40vw";
        document.getElementById("laidCardElement3").style.marginLeft = "50vw";
        document.getElementById("laidCardElement4").style.marginLeft = "60vw";
      } else if (this.laidCardsHero.length == 5) {
        document.getElementById("laidCardElement1").style.marginLeft = "25vw";
        document.getElementById("laidCardElement2").style.marginLeft = "35vw";
        document.getElementById("laidCardElement3").style.marginLeft = "45vw";
        document.getElementById("laidCardElement4").style.marginLeft = "55vw";
        document.getElementById("laidCardElement5").style.marginLeft = "65vw";
      } else if (this.laidCardsHero.length == 6) {
        document.getElementById("laidCardElement1").style.marginLeft = "20vw";
        document.getElementById("laidCardElement2").style.marginLeft = "30vw";
        document.getElementById("laidCardElement3").style.marginLeft = "40vw";
        document.getElementById("laidCardElement4").style.marginLeft = "50vw";
        document.getElementById("laidCardElement5").style.marginLeft = "60vw";
        document.getElementById("laidCardElement6").style.marginLeft = "70vw";
      } else if (this.laidCardsHero.length == 7) {
        document.getElementById("laidCardElement1").style.marginLeft = "15vw";
        document.getElementById("laidCardElement2").style.marginLeft = "25vw";
        document.getElementById("laidCardElement3").style.marginLeft = "35vw";
        document.getElementById("laidCardElement4").style.marginLeft = "45vw";
        document.getElementById("laidCardElement5").style.marginLeft = "55vw";
        document.getElementById("laidCardElement6").style.marginLeft = "65vw";
        document.getElementById("laidCardElement7").style.marginLeft = "75vw";
      }
      if (this.laidCardsEnnemy.length == 1) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "45vw";
      } else if (this.laidCardsEnnemy.length == 2) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "40vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "50vw";
      } else if (this.laidCardsEnnemy.length == 3) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "35vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "45vw";
        document.getElementById("laidCardEnnemyElement3").style.marginLeft = "55vw";
      } else if (this.laidCardsEnnemy.length == 4) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "30vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "40vw";
        document.getElementById("laidCardEnnemyElement3").style.marginLeft = "50vw";
        document.getElementById("laidCardEnnemyElement4").style.marginLeft = "60vw";
      } else if (this.laidCardsEnnemy.length == 5) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "25vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "35vw";
        document.getElementById("laidCardEnnemyElement3").style.marginLeft = "45vw";
        document.getElementById("laidCardEnnemyElement4").style.marginLeft = "55vw";
        document.getElementById("laidCardEnnemyElement5").style.marginLeft = "65vw";
      } else if (this.laidCardsEnnemy.length == 6) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "20vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "30vw";
        document.getElementById("laidCardEnnemyElement3").style.marginLeft = "40vw";
        document.getElementById("laidCardEnnemyElement4").style.marginLeft = "50vw";
        document.getElementById("laidCardEnnemyElement5").style.marginLeft = "60vw";
        document.getElementById("laidCardEnnemyElement6").style.marginLeft = "70vw";
      } else if (this.laidCardsEnnemy.length == 7) {
        document.getElementById("laidCardEnnemyElement1").style.marginLeft = "15vw";
        document.getElementById("laidCardEnnemyElement2").style.marginLeft = "25vw";
        document.getElementById("laidCardEnnemyElement3").style.marginLeft = "35vw";
        document.getElementById("laidCardEnnemyElement4").style.marginLeft = "45vw";
        document.getElementById("laidCardEnnemyElement5").style.marginLeft = "55vw";
        document.getElementById("laidCardEnnemyElement6").style.marginLeft = "65vw";
        document.getElementById("laidCardEnnemyElement7").style.marginLeft = "75vw";
      }
    })
  }

  animation() {
    setTimeout(() => {
      if (this.gameroomObject.lastPlay) {
        if (this.gameroomObject.lastPlay[0] == "layCard") {
          let layCardEffect = document.createElement("div");
          layCardEffect.style.position = "absolute";
          layCardEffect.style.height = "150%";
          layCardEffect.style.width = "150%";
          layCardEffect.style.top = "-25%";
          layCardEffect.style.left = "-25%";
          layCardEffect.className = "layCardEffect";
          layCardEffect.style.backgroundPosition = "center";
          layCardEffect.style.backgroundSize = "contain";
          layCardEffect.style.backgroundRepeat = "no-repeat";
          layCardEffect.style.backgroundImage = "url(../../assets/layCard/betterLaidCardEffect.gif)";
          if (this.gameroomObject.lastPlay[2] == JSON.parse(localStorage.getItem("playerInfo")).username) {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidHeroCard")[0].appendChild(layCardEffect);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("layCardEffect").length; i++) {
                document.getElementsByClassName("layCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("layCardEffect")[i]);
              }
            }, 2100);
          } else {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidEnnemyCard")[0].appendChild(layCardEffect);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("layCardEffect").length; i++) {
                document.getElementsByClassName("layCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("layCardEffect")[i]);
              }
            }, 2100);
          }
        } else if (this.gameroomObject.lastPlay[0] == "castSpell") {
          let castSpellEffect = document.createElement("div");
          castSpellEffect.style.position = "absolute";
          castSpellEffect.style.height = "150%";
          castSpellEffect.style.width = "150%";
          castSpellEffect.style.top = "-25%";
          castSpellEffect.style.left = "-25%";
          castSpellEffect.className = "castSpellEffect";
          castSpellEffect.style.backgroundPosition = "center";
          castSpellEffect.style.backgroundSize = "contain";
          castSpellEffect.style.backgroundRepeat = "no-repeat";
          castSpellEffect.style.backgroundImage = "url(../../assets/castSpell/heroSpellEffect.gif)";
          if (this.gameroomObject.lastPlay[2] == JSON.parse(localStorage.getItem("playerInfo")).username) {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidHeroCard")[0].appendChild(castSpellEffect);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("castSpellEffect").length; i++) {
                document.getElementsByClassName("castSpellEffect")[i].parentElement.removeChild(document.getElementsByClassName("castSpellEffect")[i]);
              }
            }, 1800);
          } else {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidEnnemyCard")[0].appendChild(castSpellEffect);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("castSpellEffect").length; i++) {
                document.getElementsByClassName("castSpellEffect")[i].parentElement.removeChild(document.getElementsByClassName("castSpellEffect")[i]);
              }
            }, 1800);
          }
        } else if (this.gameroomObject.lastPlay[0] == "pickCard") {
          let pickCardEffect = document.createElement("div");
          pickCardEffect.style.position = "absolute";
          pickCardEffect.style.height = "150%";
          pickCardEffect.style.width = "150%";
          pickCardEffect.style.top = "-45%";
          pickCardEffect.style.left = "-25%";
          pickCardEffect.className = "pickCardEffect";
          pickCardEffect.style.backgroundPosition = "center";
          pickCardEffect.style.backgroundSize = "contain";
          pickCardEffect.style.backgroundRepeat = "no-repeat";
          pickCardEffect.style.backgroundImage = "url(../../assets/pickCard/pickedUpCardEffect.gif)";
          if (this.gameroomObject.lastPlay[2] == JSON.parse(localStorage.getItem("playerInfo")).username) {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " deckCard")[0].appendChild(pickCardEffect);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("pickCardEffect").length; i++) {
                document.getElementsByClassName("pickCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("pickCardEffect")[i]);
              }
            }, 2100);
          }
        } else if (this.gameroomObject.lastPlay[0] == "endTurn") {
          //does nothing
        } else if (this.gameroomObject.lastPlay[0] == "playCardSpecialAbility") {
          let playCardSpecialAbility = document.createElement("div");
          playCardSpecialAbility.style.position = "absolute";
          playCardSpecialAbility.style.height = "150%";
          playCardSpecialAbility.style.width = "150%";
          playCardSpecialAbility.style.top = "-25%";
          playCardSpecialAbility.style.left = "-25%";
          playCardSpecialAbility.className = "playCardSpecialAbility";
          playCardSpecialAbility.style.backgroundPosition = "center";
          playCardSpecialAbility.style.backgroundSize = "contain";
          playCardSpecialAbility.style.backgroundRepeat = "no-repeat";
          playCardSpecialAbility.style.backgroundImage = "url(../../assets/playCardSpecialAbility/effectOnSelectedCard.gif)";
          let playCardSpecialAbilityTarget = document.createElement("div");
          playCardSpecialAbilityTarget.style.position = "absolute";
          playCardSpecialAbilityTarget.style.height = "150%";
          playCardSpecialAbilityTarget.style.width = "150%";
          playCardSpecialAbilityTarget.style.top = "-25%";
          playCardSpecialAbilityTarget.style.left = "-25%";
          playCardSpecialAbilityTarget.className = "playCardSpecialAbilityTarget";
          playCardSpecialAbilityTarget.style.backgroundPosition = "center";
          playCardSpecialAbilityTarget.style.backgroundSize = "contain";
          playCardSpecialAbilityTarget.style.backgroundRepeat = "no-repeat";
          playCardSpecialAbilityTarget.style.backgroundImage = "url(../../assets/playCardSpecialAbility/effectOnTargetedCard.gif)";
          if (this.gameroomObject.lastPlay[2] == JSON.parse(localStorage.getItem("playerInfo")).username) {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidHeroCard")[0].appendChild(playCardSpecialAbility);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbility").length; i++) {
                document.getElementsByClassName("playCardSpecialAbility")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbility")[i]);
              }
            }, 2300);
            //effect on targeted card
            if (this.gameroomObject.lastPlay[3] == "friend") {
              document.getElementsByClassName(this.gameroomObject.lastPlay[4] + " laidHeroCard")[0].appendChild(playCardSpecialAbilityTarget);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbilityTarget").length; i++) {
                  document.getElementsByClassName("playCardSpecialAbilityTarget")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbilityTarget")[i]);
                }
              }, 800);
            } else {
              document.getElementsByClassName(this.gameroomObject.lastPlay[4] + " laidEnnemyCard")[0].appendChild(playCardSpecialAbilityTarget);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbilityTarget").length; i++) {
                  document.getElementsByClassName("playCardSpecialAbilityTarget")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbilityTarget")[i]);
                }
              }, 800);
            }
          } else {
            document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidEnnemyCard")[0].appendChild(playCardSpecialAbility);
            setTimeout(() => {
              for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbility").length; i++) {
                document.getElementsByClassName("playCardSpecialAbility")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbility")[i]);
              }
            }, 2300);
            //effect on targeted card
            if (this.gameroomObject.lastPlay[3] == "friend") {
              document.getElementsByClassName(this.gameroomObject.lastPlay[4] + " laidEnnemyCard")[0].appendChild(playCardSpecialAbilityTarget);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbilityTarget").length; i++) {
                  document.getElementsByClassName("playCardSpecialAbilityTarget")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbilityTarget")[i]);
                }
              }, 800);
            } else {
              document.getElementsByClassName(this.gameroomObject.lastPlay[4] + " laidHeroCard")[0].appendChild(playCardSpecialAbilityTarget);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("playCardSpecialAbilityTarget").length; i++) {
                  document.getElementsByClassName("playCardSpecialAbilityTarget")[i].parentElement.removeChild(document.getElementsByClassName("playCardSpecialAbilityTarget")[i]);
                }
              }, 800);
            }
          }
        } else if (this.gameroomObject.lastPlay[0] == "attackWithCard") {

          let attackWithCardEffect = document.createElement("div");
          attackWithCardEffect.style.position = "absolute";
          attackWithCardEffect.style.height = "150%";
          attackWithCardEffect.style.width = "150%";
          attackWithCardEffect.style.top = "-25%";
          attackWithCardEffect.style.left = "-25%";
          attackWithCardEffect.className = "attackWithCardEffect";
          attackWithCardEffect.style.backgroundPosition = "center";
          attackWithCardEffect.style.backgroundSize = "contain";
          attackWithCardEffect.style.backgroundRepeat = "no-repeat";
          attackWithCardEffect.style.backgroundImage = "url(../../assets/attackWithCard/attackReceivedEffect.gif)";
          if (this.gameroomObject.lastPlay[3] == JSON.parse(localStorage.getItem("playerInfo")).username) {
            //effect on targeted card
            if (this.gameroomObject.lastPlay[2] == "friend") {
              document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidHeroCard")[0].appendChild(attackWithCardEffect);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("attackWithCardEffect").length; i++) {
                  document.getElementsByClassName("attackWithCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("attackWithCardEffect")[i]);
                }
              }, 1200);
            } else {
              document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidEnnemyCard")[0].appendChild(attackWithCardEffect);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("attackWithCardEffect").length; i++) {
                  document.getElementsByClassName("attackWithCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("attackWithCardEffect")[i]);
                }
              }, 1200);
            }
          } else {
            //effect on targeted card
            if (this.gameroomObject.lastPlay[2] == "friend") {
              document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidEnnemyCard")[0].appendChild(attackWithCardEffect);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("attackWithCardEffect").length; i++) {
                  document.getElementsByClassName("attackWithCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("attackWithCardEffect")[i]);
                }
              }, 1200);
            } else {
              document.getElementsByClassName(this.gameroomObject.lastPlay[1] + " laidHeroCard")[0].appendChild(attackWithCardEffect);
              setTimeout(() => {
                for (let i = 0; i < document.getElementsByClassName("attackWithCardEffect").length; i++) {
                  document.getElementsByClassName("attackWithCardEffect")[i].parentElement.removeChild(document.getElementsByClassName("attackWithCardEffect")[i]);
                }
              }, 1200);
            }
          }

        }
      }
    });
  }

  timeLimit = 60;
  interval;

  timer() {
    this.timeLimit = 60;
    if (this.gameroomObject.whosTurn != this.gameroomObject.nameOfPlayer) {
      this.opponentTurn = true;
      this.interval = setInterval(() => {
        this.timeLimit--;
        if (this.timeLimit <= 0 || this.gameroomObject.whosTurn == this.gameroomObject.nameOfPlayer) {
          clearInterval(this.interval);
          this.timer();
        }
      }, 1000);
    } else {
      this.opponentTurn = false;
      this.interval = setInterval(() => {
        this.timeLimit--;
        if (this.timeLimit <= 0) {
          clearInterval(this.interval);
          this.endTurn();
          this.timer();
        } else if (this.gameroomObject.whosTurn != this.gameroomObject.nameOfPlayer) {
          clearInterval(this.interval);
          this.timer();
        }
      }, 1000);
    }
  }

  endTurn() {
    let requestObj = {
      action: "gameAction",
      subAction: "endTurn",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore"
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  opponentTurn;

  cardArrow = false;

  addCardArrow(element) {
    let posX = this.viewportToPixels(element.style.marginLeft);
    this.cardArrow = true;
    document.addEventListener('mousemove', logMovement);
    document.getElementById("cardArrow").style.display = "block";
    document.getElementById("cardArrow").style.left = `${posX}px`;
    function logMovement(event) {
      let angle = Math.atan(-(event.clientX - posX) / (event.clientY - 315)) * 180 / Math.PI;
      document.getElementById("cardArrow").style.transform = `rotate(${angle}deg)`;
      let c = Math.sqrt(Math.pow(event.clientX - posX, 2) + Math.pow(event.clientY - 550, 2));
      document.getElementById("cardArrow").style.height = `${(c - 250)}px`;
    }
  }

  viewportToPixels(value) {
    var parts = value.match(/([0-9\.]+)(vh|vw)/)
    var q = Number(parts[1])
    var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]]
    return side * (q/100)
  }
  

  playerInfo;

  getPlayerInfo() {
    this.playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
  }

  returnMenu() {
    this.router.navigate(['selection']);
  }

  targetSide;
  target;

  castHeroSpell() {
    let requestObj = {
      action: "gameAction",
      subAction: "castSpell",
      targetSide: this.targetSide,
      target: this.target,
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore"
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  pickCard() {
    let requestObj = {
      action: "gameAction",
      subAction: "pickCard",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore"
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  forfeitGame() {
    let requestObj = {
      action: "gameAction",
      subAction: "forfeit",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore"
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  castSpellSelected = false;
  castHeroSpellSelected = false;

  heroSpellSelector() {
    var x = document.getElementsByClassName("laidEnnemyCard");
    for (let i = 0; i < x.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>x[i]).appendChild(selectDiv);
    }
    var y = document.getElementsByClassName("laidHeroCard");
    for (let i = 0; i < y.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>y[i]).appendChild(selectDiv);
    }

    this.castSpellSelected = true;
    this.castHeroSpellSelected = true;

    let classReference = this;

    document.addEventListener('mousemove', logMovement);

    function logMovement(event) {
      let angle = Math.atan(-(event.clientX - 750) / (event.clientY - 690)) * 180 / Math.PI;
      document.getElementById("arrow").style.transform = `rotate(${angle}deg)`;
      let c = Math.sqrt(Math.pow(event.clientX - 750, 2) + Math.pow(event.clientY - 690, 2));
      document.getElementById("arrow").style.height = `${(c - 120)}px`;
    }

    function listener(e) {
      let target = "";
      let count = 0;
      //@ts-ignore
      if (e.srcElement.offsetParent.classList.length != 0) {
        for (let i = 0; i < e.srcElement.offsetParent.classList.length; i++) {
          if (e.srcElement.offsetParent.classList[i] == "laidEnnemyCard") {
            classReference.activateSpell(target, "ennemy");
          } else if (e.srcElement.offsetParent.classList[i] == "laidHeroCard") {
            classReference.activateSpell(target, "friend");
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.offsetParent.classList[i];
            } else {
              target += " " + e.srcElement.offsetParent.classList[i];
            }
          }
        }
      } else if (e.srcElement.classList) {
        for (let i = 0; i < e.srcElement.classList.length; i++) {
          if (e.srcElement.classList[i] == "ennemyHero") {
            classReference.activateSpell(target, "ennemy");
          } else if (e.srcElement.classList[i] == "playerHero") {
            classReference.activateSpell(target, "friend");
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.classList[i];
            } else {
              target += " " + e.srcElement.classList[i];
            }
          }
        }
      }
      classReference.castSpellSelected = false;
      classReference.castHeroSpellSelected = false;
      deleteSelectDiv();
      document.removeEventListener('click', listener, true);
      document.removeEventListener('mousemove', logMovement);
    }

    function deleteSelectDiv() {
      let z = document.getElementsByClassName("selectDiv");
      let zLength = z.length;
      for (let i = 0; i < zLength; i++) {
        z[z.length - 1].parentElement.removeChild(z[z.length - 1]);
      }
    }

    document.addEventListener('click', listener, true);
  }


  activateSpell(target, targetSide) {
    let requestObj = {
      action: "gameAction",
      subAction: "castSpell",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore",
      target: target,
      targetSide: targetSide
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  cardSpellActivated(selectedCard, posX) {
    this.addCardArrow(posX);
    var x = document.getElementsByClassName("laidEnnemyCard");
    for (let i = 0; i < x.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>x[i]).appendChild(selectDiv);
    }
    var y = document.getElementsByClassName("laidHeroCard");
    for (let i = 0; i < y.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>y[i]).appendChild(selectDiv);
    }

    let classReference = this;

    function listener(e) {
      let target = "";
      let count = 0;
      //@ts-ignore
      if (e.srcElement.offsetParent.classList.length != 0) {
        for (let i = 0; i < e.srcElement.offsetParent.classList.length; i++) {
          if (e.srcElement.offsetParent.classList[i] == "laidEnnemyCard") {
            classReference.activateSpellCard(target, "ennemy", selectedCard);
          } else if (e.srcElement.offsetParent.classList[i] == "laidHeroCard") {
            classReference.activateSpellCard(target, "friend", selectedCard);
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.offsetParent.classList[i];
            } else {
              target += " " + e.srcElement.offsetParent.classList[i];
            }
          }
        }
      } else if (e.srcElement.classList) {
        for (let i = 0; i < e.srcElement.classList.length; i++) {
          if (e.srcElement.classList[i] == "ennemyHero") {
            classReference.activateSpellCard(target, "ennemy", selectedCard);
          } else if (e.srcElement.classList[i] == "playerHero") {
            classReference.activateSpellCard(target, "friend", selectedCard);
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.classList[i];
            } else {
              target += " " + e.srcElement.classList[i];
            }
          }
        }
      }
      deleteSelectDiv();
      document.getElementById("cardArrow").style.display = "none";
      document.removeEventListener('click', listener, true);
    }

    function deleteSelectDiv() {
      let z = document.getElementsByClassName("selectDiv");
      let zLength = z.length;
      for (let i = 0; i < zLength; i++) {
        z[z.length - 1].parentElement.removeChild(z[z.length - 1]);
      }
    }

    document.addEventListener('click', listener, true);
  }

  activateSpellCard(target, targetSide, selectedCard) {
    let requestObj = {
      action: "gameAction",
      subAction: "playCardSpecialAbility",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore",
      target: target,
      targetSide: targetSide,
      selectedCard: selectedCard
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  attackCardActivated(selectedCard, posX) {
    this.addCardArrow(posX);
    var x = document.getElementsByClassName("laidEnnemyCard");
    for (let i = 0; i < x.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>x[i]).appendChild(selectDiv);
    }
    var y = document.getElementsByClassName("laidHeroCard");
    for (let i = 0; i < y.length; i++) {
      let selectDiv = document.createElement("div");
      selectDiv.style.position = "absolute";
      selectDiv.style.height = "100%";
      selectDiv.style.width = "100%";
      selectDiv.style.top = "0px";
      selectDiv.style.left = "0px";
      selectDiv.style.backgroundColor = "red";
      selectDiv.style.opacity = "0.3";
      selectDiv.style.cursor = "pointer";
      selectDiv.className = "selectDiv";
      (<HTMLElement>y[i]).appendChild(selectDiv);
    }

    let classReference = this;
    this.castSpellSelected = true;

    function listener(e) {
      let target = "";
      let count = 0;
      //@ts-ignore
      if (e.srcElement.offsetParent.classList.length != 0) {
        for (let i = 0; i < e.srcElement.offsetParent.classList.length; i++) {
          if (e.srcElement.offsetParent.classList[i] == "laidEnnemyCard") {
            classReference.activateAttackCard(target, "ennemy", selectedCard);
          } else if (e.srcElement.offsetParent.classList[i] == "laidHeroCard") {
            classReference.activateAttackCard(target, "friend", selectedCard);
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.offsetParent.classList[i];
            } else {
              target += " " + e.srcElement.offsetParent.classList[i];
            }
          }
        }
      } else if (e.srcElement.classList) {
        for (let i = 0; i < e.srcElement.classList.length; i++) {
          if (e.srcElement.classList[i] == "ennemyHero") {
            classReference.activateAttackCard(target, "ennemy", selectedCard);
          } else if (e.srcElement.classList[i] == "playerHero") {
            classReference.activateAttackCard(target, "friend", selectedCard);
          } else {
            count = count + 1;
            if (count == 1) {
              target += e.srcElement.classList[i];
            } else {
              target += " " + e.srcElement.classList[i];
            }
          }
        }
      }
      classReference.castSpellSelected = false;
      deleteSelectDiv();
      document.getElementById("cardArrow").style.display = "none";
      document.removeEventListener('click', listener, true);
    }

    function deleteSelectDiv() {
      let z = document.getElementsByClassName("selectDiv");
      let zLength = z.length;
      for (let i = 0; i < zLength; i++) {
        z[z.length - 1].parentElement.removeChild(z[z.length - 1]);
      }
    }

    document.addEventListener('click', listener, true);
  }

  activateAttackCard(target, targetSide, selectedCard) {
    let requestObj = {
      action: "gameAction",
      subAction: "attackWithCard",
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore",
      target: target,
      targetSide: targetSide,
      selectedCard: selectedCard
    }
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe();
  }

  mouseEnter = true;
  initialMarginTopOfCard;
  selectedCard;
  hoveredElement;

  cardShowOnHover(element, selectedCard) {
      this.initialMarginTopOfCard = element.style.marginTop;
      element.style.marginTop = "-15%";
      this.mouseEnter = false;
      this.selectedCard = selectedCard;
      this.hoveredElement = element;
  }

  cardShowOffHover(element, selectedCard){
    element.style.marginTop = this.initialMarginTopOfCard;
    this.mouseEnter = true;
  }

  gameroomObject;
  cards = [];

  layCard(nameOfCard) {
    let requestObj = {
      action: "gameAction",
      subAction: "layCard",
      laidCard: nameOfCard,
      gameroomId: localStorage.getItem("gameroomId"),
      player1: "ignore",
      player2: "ignore"
    }
    this.mouseEnter = true;
    this.hoveredElement.style.marginTop = this.initialMarginTopOfCard;
    this.dataService.gameActions(requestObj, localStorage.getItem("accessToken")).subscribe((res) => { this.cards = res.json().detailedCards; });
  }

  sortCardsOfDeck() {
    this.cards = this.gameroomObject.deckOfPlayer;
  }

  hpOfHero;
  maxHpOfHero;
  hpPercentage;

  getHpPercentageOfHero() {
    this.hpOfHero = this.gameroomObject.hpOfPlayer;
    this.maxHpOfHero = this.gameroomObject.maxHpOfPlayer;
    this.hpPercentage = (this.hpOfHero * 100 / this.maxHpOfHero);
    document.getElementById("hpBarHero").style.width = this.hpPercentage + "%";
  }

  manaOfHero;
  maxManaOfHero;
  manaPercentage;

  getManaPercentageOfHero() {
    this.manaOfHero = this.gameroomObject.manaOfPlayer;
    this.maxManaOfHero = this.gameroomObject.maxManaOfPlayer;
    this.manaPercentage = (this.manaOfHero * 100 / this.maxManaOfHero);
    document.getElementById("manaBarHero").style.width = this.manaPercentage + "%";
  }

  hpOfEnnemy;
  maxHpOfEnnemy;
  hpPercentageEnnemy;

  getHpPercentageOfEnnemy() {
    this.hpOfEnnemy = this.gameroomObject.hpOfEnnemy;
    this.maxHpOfEnnemy = this.gameroomObject.maxHpOfEnnemy;
    this.hpPercentageEnnemy = (this.hpOfEnnemy * 100 / this.maxHpOfEnnemy);
    document.getElementById("hpBarEnnemy").style.width = this.hpPercentageEnnemy + "%";
  }

  manaOfEnnemy;
  maxManaOfEnnemy;
  manaPercentageEnnemy;

  getManaPercentageOfEnnemy() {
    this.manaOfEnnemy = this.gameroomObject.manaOfEnnemy;
    this.maxManaOfEnnemy = this.gameroomObject.maxManaOfEnnemy;
    this.manaPercentageEnnemy = (this.manaOfEnnemy * 100 / this.maxManaOfEnnemy);
    document.getElementById("manaBarEnnemy").style.width = this.manaPercentageEnnemy + "%";
  }


  laidCardsHero = [];
  laidCardsEnnemy = [];
  getLaidCards() {
    this.laidCardsEnnemy = this.gameroomObject.laidCardsOfEnnemy;
    this.laidCardsHero = this.gameroomObject.laidCardsOfPlayer;
  }

  getPlayersStatus() {
    this.getHpPercentageOfEnnemy();
    this.getHpPercentageOfHero();
    this.getManaPercentageOfEnnemy();
    this.getManaPercentageOfHero();
    this.getLaidCards();
    this.sortCardsOfDeck();
    this.checkIfWinner();
    this.animation();
    this.adjustCardPosition();
  }

  isWinner = false;
  notWinner = false;

  checkIfWinner() {
    if (this.gameroomObject.theWinner != undefined) {
      if (this.gameroomObject.theWinner == this.gameroomObject.nameOfPlayer) {
        this.playerInfo.wins = this.playerInfo.wins + 1;
        this.playerInfo.gamesPlayed = this.playerInfo.gamesPlayed + 1;
        this.playerInfo.cash = this.playerInfo.cash + 420;
        localStorage.setItem("playerInfo", JSON.stringify(this.playerInfo));
        this.isWinner = true;
      } else {
        this.playerInfo.losses = this.playerInfo.losses + 1;
        this.playerInfo.gamesPlayed = this.playerInfo.gamesPlayed + 1;
        localStorage.setItem("playerInfo", JSON.stringify(this.playerInfo));
        this.notWinner = true;
      }
      clearInterval(this.interval);
    }
  }

  refreshListener;

  gameView() {
    this.dataService.gameroomView(localStorage.getItem("gameroomId"), localStorage.getItem("accessToken")).subscribe((res) => { this.gameroomObject = res.json(); this.getPlayersStatus(); });
    let classReference = this;
    const socket = io('http://138.197.167.143:8080');
    socket.on('connect', function () {
      socket.emit('stream', { gameroomId: localStorage.getItem("gameroomId"), accessToken: localStorage.getItem("accessToken"), username: JSON.parse(localStorage.getItem("playerInfo")).username });
      if (!socket.connected) {
        location.reload(true);
      } else {
        let classReference = this;
        classReference.refreshListener = window.addEventListener('beforeunload', function eventQuitListener(event) {
          classReference.forfeitGame();
          return null;
        }); 
      }
    });

    socket.on('stream' + classReference.playerInfo.username, function (data) {
      console.log(data);
      classReference.gameroomObject = data;
      if (classReference.gameroomObject.theWinner) {
        socket.disconnect();
      }
      classReference.getPlayersStatus();
    })

  }

}
