import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ContentModel} from '../../models/content.model';
import {MatSnackBar, PageEvent} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-all-contents',
  templateUrl: './all-contents.component.html',
  styleUrls: ['./all-contents.component.css']
})
export class AllContentsComponent implements OnInit {
  allContents: ContentModel[] = [];
  pageSize = 6;
  total = 2;
  pageIndex = 1;
  panelOpenState = false;

  constructor(private contentService: ContentService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
    this.contentService.contentAsObservable().subscribe((contentData) => {
      console.log(this.allContents);
      this.allContents = contentData.contents;
      this.total = contentData.count;
    });
  }

  onDelete(id: string) {
    this.contentService.deleteContent(id).subscribe(contentValues => {
      this.contentService.getAllcontents(this.pageSize, this.pageIndex);
      this.openSnackBar('Content delete successful');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ' ', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['done']
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
  }

}
