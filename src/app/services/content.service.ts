import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContentModel} from '../models/content.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: ContentModel[] = [];
  private contentSubject = new Subject<ContentModel[]>();

  private getContentUrl = 'http://localhost:8080/contents';

getAllcontents() {
  this.http.get<{message: string, contents: ContentModel[]}>(this.getContentUrl).subscribe((gotContents) => {
    this.contents = gotContents.contents;
    this.contentSubject.next(this.contents);
  });
}

postvalues(id: string, heading: string, description: string, category: string) {
  const content: ContentModel = new ContentModel(id, heading, description, category);
  console.log(content);
  return this.http.post<{message: string}>(this.getContentUrl, content);
}

contentAsObservable(): Observable<ContentModel[]> {
  return this.contentSubject.asObservable();
}

  constructor(private http: HttpClient) {}
}
