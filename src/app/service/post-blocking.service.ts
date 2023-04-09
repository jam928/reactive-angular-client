import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostBlockingService {

  url: string = 'http://localhost:8080/posts-blocking';
  urlPaged: string = 'http://localhost:8080/posts-blocking-paged';

  constructor(private http: HttpClient) {}

  getPosts(page?: number, size?: number): Observable<Array<Post>> {
    let url = this.url;
    if (page != null) {
      url = this.urlPaged + '?page=' + page + '&size=' + size;
    }
    return this.http.get<Array<Post>>(url);
  }
}
