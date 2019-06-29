import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(public http:Http) { }

  //selectCard
  selectCardToDeck(requestOBJ,accessToken){
    return this.http.post("http://138.197.167.143:8000/api/cardShops?access_token="+accessToken,requestOBJ);
  }

  login(userOBJ){
    return this.http.post("http://138.197.167.143:8000/api/players/login",userOBJ);
  }

  logout(accessToken,ignore){
    return this.http.post("http://138.197.167.143:8000/api/players/logout?access_token=" + accessToken ,ignore);
  }
  
  registerNewAccount(userOBJ){
    return this.http.post("http://138.197.167.143:8000/api/players",userOBJ);
  }

  //get player info
  getPlayerInfo(userId,accessToken){
    return this.http.get("http://138.197.167.143:8000/api/players/"+userId+"?access_token="+accessToken);
  }

  //check if queue popped
  queueView(accessToken){
    return this.http.get("http://138.197.167.143:8000/api/queues?access_token="+accessToken);
  }

  //join the queue
  queueJoin(requestOBJ,accessToken){
    return this.http.post("http://138.197.167.143:8000/api/queues?access_token="+accessToken,requestOBJ);
  }

  //execute actions in game
  gameActions(requestOBJ,accessToken){
    return this.http.post("http://138.197.167.143:8000/api/gamerooms?access_token="+accessToken,requestOBJ);
  }
  
  //the data the players will see
  gameroomView(id,accessToken){
    return this.http.get("http://138.197.167.143:8000/api/gamerooms/"+id+"?access_token="+accessToken);
  }

  //cards shop
  getCardsShop(){
    return this.http.get("http://138.197.167.143:8000/api/cardShops");
  }

  buyCard(requestOBJ,accessToken){
    return this.http.post("http://138.197.167.143:8000/api/cardShops?access_token="+accessToken,requestOBJ);
  }

}
