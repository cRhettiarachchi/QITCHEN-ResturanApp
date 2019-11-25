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
  private resultmessage: string;

  private getContentUrl = 'http://localhost:8080/contents';

getAllcontents(pageSize: number, pageIndex: number) {
  let queries = `?pagesize=${pageSize}&pageindex=${pageIndex}`;
  console.log(queries);
  this.http.get<{message: string, contents: any}>(this.getContentUrl + '/' + queries)
    .pipe(map((contentsData) => {
      return contentsData.contents.map(cont => {
        console.log(cont.heading);
        return {
          heading: cont.heading,
          description: cont.description,
          category: cont.category,
          id: cont._id,
          price: cont.price,
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

postvalues(heading: string, description: string, category: string, price: number, file: File) {
  const postData = new FormData();
  postData.append('heading', heading);
  postData.append('description', description);
  postData.append('category', category);
  postData.append('price', ((price as unknown) as string));
  postData.append('image', file, heading);
  console.log(file);
  return this.http.post<{message: string, contentValue: ContentModel}>(this.getContentUrl, postData);
}

getContent(id: string) {
  return this.http.get<{
    _id: string,
    heading: string,
    description: string,
    category: string,
    price: number,
    imagePath: string
  }>(this.getContentUrl + '/' + id);
}

updateContent(id: string, head: string, desc: string, cat: string, price: number, imgPath: File | string) {
  let contentData;
  if (typeof(imgPath) === 'object') {
    contentData = new FormData();
    contentData.append('id', id);
    contentData.append('heading', head);
    contentData.append('description', desc);
    contentData.append('price', ((price as unknown) as string));
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
  return this.http.patch<{message: string}>(this.getContentUrl + '/' + id, contentData);
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
