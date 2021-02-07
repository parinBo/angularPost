import {Injectable} from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

interface data{
    email:String,
    password:string
}


@Injectable({ providedIn: "root" })
export class AuthService{
    private token:string
    private isAuthen = false
    private tokenTimer : NodeJS.Timer
    private authSub  = new Subject<boolean>()
    constructor(private http:HttpClient,private router : Router){}

    getToken(){
        return this.token
    }

    getIsAuthen(){
        return this.isAuthen;
    }

    getAuthListen(){
        return this.authSub.asObservable()
    }
    createUser(email:string,password:string){
        const data:data = {email:email,password:password}
        this.http.post<{bool:boolean}>("http://localhost:3000/user/singup",data).subscribe()
    }

    login(email:string,password:string){
        const data:data = {email:email,password:password}
        this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/user/login",data).subscribe(res=>{
            this.token = res.token
            if(this.token){
                this.isAuthen = true
                this.authSub.next(this.isAuthen)
                this.router.navigate(['/'])
                this.tokenTimer = setTimeout(()=>{
                    this.logout()
                },res.expiresIn*1000)
                this.saveAuthDataa(this.token,new Date(new Date().getTime()+res.expiresIn*1000))
            }
        })
    }

    autoAuthUser(){
        const authData = this.getAuthData()
        if(!authData)return;
        const now = new Date()
        const expiresIn = authData.expire.getTime() - now.getTime();
        if(expiresIn > 0){
            this.token = authData.token
            this.isAuthen = true
            this.setAuthTimer(expiresIn/1000)
            this.authSub.next(true)
        }
    }

    logout(){
        this.token = null
        this.isAuthen = false
        this.authSub.next(this.isAuthen)
        this.router.navigate(['/login'])
        this.clearAuthData()
        clearTimeout(this.tokenTimer)
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

    private saveAuthDataa(token:string , exp:Date){
        localStorage.setItem('token',token)
        localStorage.setItem('expire',exp.toISOString())
    }

    private clearAuthData(){
        localStorage.removeItem('token')
        localStorage.removeItem('expire')
    }

    private getAuthData(){
        const token = localStorage.getItem('token')
        const expire = localStorage.getItem('expire')
        if(!token || !expire) return;
        return{
            token:token,
            expire:new Date(expire)
        }
    }

}