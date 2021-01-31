import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../Post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post:Post
  constructor(public postService:PostService) { }

  ngOnInit(): void {
  }

  onSavePost(form:NgForm){
    this.postService.addPost(form.value.title,form.value.content)
    form.resetForm()

  }

}
