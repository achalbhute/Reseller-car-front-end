import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import config from './config/config'


@Injectable()
export class UserServiceService {
    baseUrl = config.baseUrl;
    constructor(private http: Http) { }

    login(creds) {
        let url = this.baseUrl + 'login';
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', creds.username);
        urlSearchParams.append('password', creds.password);
        let body = urlSearchParams.toString();
        return this.http.post(url, body, {
            headers: headers
        })
        .map(res => {
            let resp = res.json();
            if (resp.success && resp.token) {
                localStorage.setItem('token', resp.token);
                localStorage.setItem('user', JSON.stringify(resp.user));
            }
            return resp;
        });
    }
    getUser() {
        let url = this.baseUrl + 'me';
        let headers = new Headers();
        const token = localStorage.getItem('token');
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.http.get(url, {
            headers: headers
        })
            .map(res => {
                let resp = res.json();
                if (resp.id) {
                    localStorage.setItem('user', JSON.stringify(resp));
                }
                return resp;
            });
    }
    logOut() {
        localStorage.clear();
    }
    ////////////////////////////
    //communication
    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}
