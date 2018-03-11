import { Component, OnInit } from '@angular/core';
import { CarserviceService } from './../carservice.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  providers: [CarserviceService]
  
})
export class CarListComponent implements OnInit {
  cars: {};
  show : boolean = true;
  constructor(private route: ActivatedRoute,private router: Router,private carserviceService: CarserviceService, private ref: ChangeDetectorRef) {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role == 'buyer'){
      this.show=false;
    }
    this.carserviceService.getCar(null).subscribe(car => {
              if(car && car.length >0){
                this.cars = car;
                this.carserviceService.selectedCarId= car[0].id;
              }
            });
        }
  ngOnInit() {
  }

  
  Add(){
    this.router.navigate(['/add']);
  }

}
