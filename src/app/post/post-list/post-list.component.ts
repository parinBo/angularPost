import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {Post} from '../post'
import { PostService } from '../Post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:Post[] = []
  Sub : Subscription;
  mode:string = "create"
  isAuthen=false
  private authSub
  constructor(public postSer:PostService,public authService:AuthService) { }


  ngOnInit(): void {
    this.postSer.getPost()
    this.Sub =  this.postSer.getPostUpdate().subscribe(res=>{
      this.posts=res
    })
    //login
    this.isAuthen = this.authService.getIsAuthen()
    // logout
    this.authService.getAuthListen().subscribe(re=>{
      this.isAuthen=re
    })
  }


  onDelete(id:string){
    this.postSer.deletePost(id)
  }

}
