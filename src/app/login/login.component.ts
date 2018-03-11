import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { UserServiceService } from './../user-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router,
    private userServiceService: UserServiceService,
     private ref: ChangeDetectorRef) 
  { }

  ngOnInit() {
  }
  login(form: NgForm){
    let creds= {};
   creds['username'] =form.value['username'];
   creds['password'] =form.value['password'];
    this.userServiceService.login(creds).subscribe(success => {
      if(localStorage.getItem('token')){
        this.userServiceService.emitChange({loggedIn:true});
        this.router.navigate(['/']);
      }else
      alert('Wrong Username/ Password');

    });
  }
}
