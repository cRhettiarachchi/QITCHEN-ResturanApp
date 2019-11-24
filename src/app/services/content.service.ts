import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContentModel} from '../models/content.model';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: ContentModel[] = [];
  private contentSubject = new Subject<ContentModel[]>();
  private resultmessage:string;

  private getContentUrl = 'http://localhost:8080/contents';

getAllcontents() {
  this.http.get<{message: string, contents: any}>(this.getContentUrl)
    .pipe(map((contentsData) => {
      return contentsData.contents.map(cont => {
        console.log(cont.heading);
        return {
          heading: cont.heading,
          description: cont.description,
          category: cont.category,
          id: cont._id
        };
      });
    }))
    .subscribe((gotContents) => {
      console.log(gotContents);
    this.contents = gotContents;
    this.contentSubject.next(this.contents);
  });
}

postvalues(heading: string, description: string, category: string) {
  const content: ContentModel = new ContentModel(heading, description, category);
  this.http.post<{message: string, id: string}>(this.getContentUrl, content)
    .subscribe(value => {
      content.id = value.id;
      this.contents.push(content);
      this.contentSubject.next([...this.contents]);
      this.resultmessage = value.message;
    });
}

getContent(id: string) {
  return this.http.get<{
    _id: string,
    heading: string,
    description: string,
    category: string
  }>(this.getContentUrl + '/' + id);
}

updateContent(id: string, head: string, desc: string, cat: string) {
  const updateContent = {
    id: id,
    heading: head,
    description: desc,
    category: cat
  };
  this.http.patch<{message: string}>(this.getContentUrl + '/' + id, updateContent)
    .subscribe(value => {
      console.log('updated successfully');
    });
}

deleteContent(id: string) {
  this.http.delete<{message: string}>(this.getContentUrl + '/' + id).subscribe(value => {
    this.contents = this.contents.filter(content => content.id !== id);
    this.contentSubject.next([...this.contents]);
  });
}
contentAsObservable(): Observable<ContentModel[]> {
  return this.contentSubject.asObservable();
}

  constructor(private http: HttpClient) {}
}
