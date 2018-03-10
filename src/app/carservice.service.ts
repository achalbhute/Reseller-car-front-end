import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CarserviceService {
baseUrl = 'http://localhost:3000/cars/';

selectedCarId =1;
constructor(private http: Http) { 
  }
  getCar( id )
  {
    let url = this.baseUrl;
    let headers = this.makeHeader();
    if(id){
      url = url + id;
    }
      return this.http.get(url, {
        headers: headers})
      .map(res => res.json());
  }

  postCar(car)
  {
    let url = this.baseUrl;
    let headers =  this.makeHeader();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('make', car.make);
    urlSearchParams.append('model', car.model);
    urlSearchParams.append('year', car.year);
    urlSearchParams.append('color', car.color);
    urlSearchParams.append('description', car.description);
    urlSearchParams.append('history', car.history);    
    urlSearchParams.append('seller_id', car.seller_id);    
    let body = urlSearchParams.toString()
    return this.http.post(url, body,{
        headers: headers})
      .map(res => res.json());
  }

  buyCar(id, buyerId)
  {
    let url = this.baseUrl;
    let headers =  this.makeHeader();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log('bid'+buyerId);
    if(id){
      url = url + id;
    }
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('buyer_id', buyerId);
    let body = urlSearchParams.toString()
      return this.http.patch(url,body, {
        headers: headers})
      .map(res => res.json());
  }

  makeHeader()
  {
    let headers = new Headers();
    const token = localStorage.getItem('token');
    if(token){
      headers.append('x-access-token',token );
    }
    return headers;
  }
}
