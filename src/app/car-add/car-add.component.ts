import { Component, OnInit } from '@angular/core';
import { CarserviceService } from './../carservice.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
  providers: [CarserviceService]
  
})
export class CarAddComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router,private carserviceService: CarserviceService, private ref: ChangeDetectorRef) 
    { 
      if(!localStorage.getItem('token')){
        this.router.navigate(['/login']);
      }
    }

  ngOnInit() {
  }

  save(form: NgForm){
    let car= {};
   car['make'] =form.value['make'];
   car['model']=form.value['model'];
   car['year']=form.value['year'];
   car['color']=form.value['color'];
   car['description']=form.value['description'];
   car['history']=form.value['history'];    
    car['seller_id'] =2;
    this.carserviceService.postCar(car).subscribe(success => {
        alert("Car added.");
        this.router.navigate(['/']);
    });
  }
}
