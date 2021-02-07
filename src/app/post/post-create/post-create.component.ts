import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../Post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post:Post
  mode : string = "create"
  id:string=""
  types: any[] = [
    {value: 'withdraw', val: 'withdraw'},
    {value: 'balance', val: 'balance'},
  ];
  constructor(public postService:PostService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(map=>{
      if(map.has("id")){
        this.mode="edit"
        this.id = map.get("id")
        this.postService.getPostId(this.id).subscribe(res=>{
          this.post = {id:res._id,title:res.title,content:res.content}
        })
      }else{
        this.mode="create"
      }
    })
  }

  onSavePost(form:NgForm){
    if (form.invalid) {
      return;
    }
    if(this.mode==="create"){
      this.postService.addPost(form.value.title,form.value.content)
      console.dir(form.value.type)
    }else{

    }
    form.resetForm()

  }

}
