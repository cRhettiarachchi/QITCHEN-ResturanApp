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
          id: cont._id,
          imagePath: cont.imagePath
        };
      });
    }))
    .subscribe((gotContents) => {
      console.log(gotContents);
      this.contents = gotContents;
      this.contentSubject.next(this.contents);
  });
}

postvalues(heading: string, description: string, category: string, file: File) {
  const postData = new FormData();
  postData.append('heading', heading);
  postData.append('description', description);
  postData.append('category', category);
  postData.append('image', file, heading);
  console.log(file);
  this.http.post<{message: string, contentValue: ContentModel}>(this.getContentUrl, postData)
    .subscribe(value => {
      const content: ContentModel = new ContentModel(heading, description, category, value.contentValue.imagePath);
      content.id = value.contentValue.id;
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
    category: string,
    imagePath: string
  }>(this.getContentUrl + '/' + id);
}

updateContent(id: string, head: string, desc: string, cat: string, imgPath: File | string) {
  let contentData;
  if (typeof(imgPath) === 'object') {
    contentData = new FormData();
    contentData.append('id', id);
    contentData.append('heading', head);
    contentData.append('description', desc);
    contentData.append('image', imgPath);
  } else {
    contentData = {
      id: id,
      heading: head,
      description: desc,
      category: cat,
      imagePath: imgPath
    };
  }
  this.http.patch<{message: string}>(this.getContentUrl + '/' + id, contentData)
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
