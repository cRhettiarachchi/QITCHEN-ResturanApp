import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContentModel} from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: ContentModel[] = [];
  private contentSubject = new Subject<ContentModel[]>();

getAllcontents() {
  const values = [{
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
    },
    {
      id: '5',
      heading: 'food 5',
      desc: 'this is one of the best food available',
      category: 'dinner',
      img: 'assets/img/burger.jpg'
    },
    {
      id: '6',
      heading: 'food 6',
      desc: 'this is one of the best food available',
      category: 'lunch',
      img: 'assets/img/burger.jpg'
    },
    {
      id: '7',
      heading: 'food 7',
      desc: 'this is one of the best food available',
      category: 'deserts',
      img: 'assets/img/burger.jpg'
    },
    {
      id: '7',
      heading: 'food 4',
      desc: 'this is one of the best food available',
      category: 'coffee',
      img: 'assets/img/burger.jpg'
    },
  ];
  this.contents = values;
  // this.contentSubject.next([...this.contents]);
  return [...this.contents];
}

// contentAsObservable(): Observable<ContentModel[]> {
//   return this.contentSubject.asObservable();
// }

  constructor() { }
}
