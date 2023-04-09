import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostReactiveService {

  url: string = 'http://localhost:8080/posts-reactive';
  urlPaged: string = 'http://localhost:8080/posts-reactive-paged';

  constructor() { }

  getPostsStream(page?: number, size?: number) {
    return new Observable<Post>((observer) => {
      let url = this.url;
      if(page != null) {
        url = this.urlPaged + "?page=" + page + "&size=" + size;
      }
      let eventSource = new EventSource(url);
      eventSource.onmessage = (event) => {
        console.log("Received event: " + event);
        let json = JSON.parse(event.data);
        observer.next(new Post(json['id'], json['title'], json['body'], json['author']));
      };

      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection.
        // so we can safely treat it as a normal connection. 
        if(eventSource.readyState === 0) {
          console.log("This stream has been closed by the server.");
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
      
    });

  }
}
