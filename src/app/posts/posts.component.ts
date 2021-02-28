import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:[any];
  error;

  constructor(private postService:PostService) {
   }
  ngOnInit(): void {
    this.postService.getPosts().subscribe(response=>{this.posts=<[any]>response}
    ,error=>this.error=error);

  }

   createPost(input:HTMLInputElement){
      const post={title:input.value};
      this.postService.createPost(input).subscribe(response=>{
        this.posts.splice(0,0,post);//splice 0 indexten başla 0 tane sil yani silme bunun yerine oluşturduğum postu gönder
      });
   }

   updatePost(post){
     post.title='updated';
     this.postService.updatePost(post).subscribe(response=>{console.log(response)});
   }

   deletePost(post){
      this.postService.deletePost(post)
      .subscribe(response=>{console.log(response)
      let index=this.posts.indexOf(post);//index numarasını öğrendim
      this.posts.splice(index,1);//indexten başlayarak bir tane eleman
    });
   }

}


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'posts',
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.css']
// })
// export class PostsComponent {
//   posts:[any];
//   private url='https://jsonplaceholder.typicode.com/posts';
//   constructor(private http:HttpClient) {
//     http.get(this.url).subscribe(response=>{this.posts=<[any]>response});
//    }

//    createPost(input:HTMLInputElement){
//       const post={title:input.value};
//       console.log(post);
//       this.http.post(this.url,JSON.stringify(post)).subscribe(response=>{
//         console.log(response)
//         // console.log(post['id']);
//         // console.log(response['id'])
//         // post['id']=response['id'];
//         // console.log(post['id']);
//         console.log(post);
//         this.posts.splice(0,0,post);//splice 0 indexten başla 0 tane sil yani silme bunun yerine oluşturduğum postu gönder
//       });
//    }

//    updatePost(post){
//      post.title='updated';
//      this.http.put(this.url+'/'+post.id,JSON.stringify(post)).subscribe(response=>{console.log(response)});
//     //  this.http.patch(this.url+'/'+post.id,JSON.stringify({title:'updated'}))
//     //  .subscribe(response=>{console.log(response)});
//    }

//    deletePost(post){
//      this.http.delete(this.url+'/'+post.id)
//      .subscribe(response=>{console.log(response)
//       let index=this.posts.indexOf(post);//index numarasını öğrendim
//       this.posts.splice(index,1);//indexten başlayarak bir tane eleman
//     });
//    }

// }
