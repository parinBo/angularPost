import { HttpClient } from "@angular/common/http";
import { Post } from "./post";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PostService{
    http : HttpClient
    private posts: Post[] = [];

    addPost(title:string,content:string){
        const p:Post = {id:"",title:title,content:content}
        this.posts.push(p)
    }

    readPost(){
        return this.posts;
    }
}