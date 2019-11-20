import { Injectable } from '@angular/core';
import {ContentModel} from '../models/content.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents: ContentModel[] = [];
  private contentSubject = new Subject<ContentModel[]>();



  constructor() { }
}
