import { Component, OnInit } from '@angular/core';
import { CarserviceService } from './../carservice.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-car-detail',
    templateUrl: './car-detail.component.html',
    styleUrls: ['./car-detail.component.css'],
    providers: [CarserviceService]
})
export class CarDetailComponent implements OnInit {
    show: boolean = true;
    car: {};
    constructor(private route: ActivatedRoute, private router: Router, private carserviceService: CarserviceService, private ref: ChangeDetectorRef) {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['/login']);
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role == 'seller') {
            this.show = false;
        }

        let id = this.route.snapshot.paramMap.get('id');
        this.carserviceService.getCar(id).subscribe(car => {
            this.car = car;
        });

    }

    ngOnInit() {
    }

    Buy() {
        let id = this.route.snapshot.paramMap.get('id');
        this.carserviceService.buyCar(id, 1).subscribe(success => {
            alert('Car Bought!');
            this.Back();
        });
    }

    Back() {
        this.router.navigate(['/']);
    }
}
