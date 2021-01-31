import { Component, OnInit } from '@angular/core';
import {Post} from '../post'
import { PostService } from '../Post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts:Post[] = []


  constructor(public postSer:PostService) { }
  ngOnInit(): void {
    this.posts =  this.postSer.readPost()
  }


  onDelete(id:string){
  }

}
