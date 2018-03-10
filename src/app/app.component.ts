import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserServiceService]
})
export class AppComponent implements OnInit  {
  title = 'app';
   showButton =false;
  constructor(private route: ActivatedRoute,private router: Router,private userServiceService: UserServiceService){
}
logout(){
 this.userServiceService.logOut();
 //this.show = false;
  this.router.navigate(['/login']);
}
ngOnInit() {
//   if(!localStorage.getItem('token')){
//     this.show= false;
// }
// else
// this.show = true;
}
show(){
  this.showButton= true;
}
}

