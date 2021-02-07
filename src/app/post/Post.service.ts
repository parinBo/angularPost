import { HttpClient } from "@angular/common/http";
import { Post } from "./post";
import { Injectable } from "@angular/core";
import {map} from 'rxjs/operators'
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class PostService{
    
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>()


    constructor(private http : HttpClient){}

    addPost(title:string,content:string){
      const post: Post = {id:"",title: title, content: content};
      this.http.post<{msg:string}>("http://localhost:3000/post",post).subscribe((res)=>{})
      this.postsUpdated.next([...this.posts]);
    }

    getPost(){
        this.http.get<{posts: any }>("http://localhost:3000/post").pipe(map((data)=>{
            return data.posts.map(post=>{
              return{
                id:post._id,
              title:post.title,
              content:post.content
              }
            })
          })).subscribe(res=>{
              this.posts = res
              this.postsUpdated.next(this.posts)
          })
        return this.posts;
    }

    getPostUpdate(){
        return this.postsUpdated
    }

    getPostId(id:string){
      return this.http.get<{ _id: string; title: string; content: string }>(
        "http://localhost:3000/post/" + id
      );
    }

    deletePost(id:string){
      this.http.delete("http://localhost:3000/post/"+id).subscribe(res=>{
        const updatePost = this.posts.find(p=>p.id!=id)
        this.postsUpdated.next([updatePost])
        
      })
    }
}