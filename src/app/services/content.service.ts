import { Injectable } from '@angular/core';
import {ContentModel} from '../models/content.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: ContentModel[] = [];
  private contentSubject = new Subject<ContentModel[]>();

getAllcontents() {
  this.contents = [{
    id: '1',
    heading: 'food 1',
    desc: 'this is one of the best food available',
    category: 'breakfast',
    img: 'assets/img/burger.jpg'
  },
    {
      id: '2',
      heading: 'food 2',
      desc: 'this is one of the best food available',
      category: 'breakfast',
      img: 'assets/img/burger.jpg'
    },
    {
      id: '3',
      heading: 'food 3',
      desc: 'this is one of the best food available',
      category: 'breakfast',
      img: 'assets/img/burger.jpg'
    },
    {
      id: '4',
      heading: 'food 4',
      desc: 'this is one of the best food available',
      category: 'breakfast',
      img: 'assets/img/burger.jpg'
    }];
  return this.contents;
  // this.contentSubject.next([...this.contents]);
}

// contentAsObservable(): Observable<ContentModel[]> {
//   return this.contentSubject.asObservable();
// }

  constructor() { }
}
