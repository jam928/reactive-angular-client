import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostBlockingService } from 'src/app/service/post-blocking.service';
import { PostReactiveService } from 'src/app/service/post-reactive.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  selectedPost: Post | undefined;
  mode: string;
  pagination: boolean;
  page: number;
  size: number;

  constructor(private postReactiveService: PostReactiveService, private postBlockingService: PostBlockingService, private cdr: ChangeDetectorRef) {
    this.mode = "reactive";
    this.pagination = true;
    this.page = 0;
    this.size = 50;
  }

  ngOnInit(): void {
    
  }

  resetData() {
    this.posts = [];
  }

  requestPostsStream(): void {
    this.resetData();
    let postObservable: Observable<Post>;
    if (this.pagination === true) {
      postObservable = this.postReactiveService.getPostsStream(this.page, this.size);
    } else {
      postObservable = this.postReactiveService.getPostsStream();
    }
    postObservable.subscribe((post: Post) => {
      this.posts.push(post);
      this.cdr.detectChanges();
    });
  }

  requestPostsBlocking(): void {
    this.resetData();
    if (this.pagination === true) {
      this.postBlockingService.getPosts(this.page, this.size)
        .subscribe(res => this.posts = res);
    } else {
      this.postBlockingService.getPosts()
        .subscribe(res => this.posts = res);
    }
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.cdr.detectChanges();
  }

}
