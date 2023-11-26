import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {NgForm} from '@angular/forms';

import heliVerseData from "../../assets/data.json";


interface Data {
  id: Number;
  first_name: String;
  last_name: String;
  email: String;
  gender: String;
  avatar: String;
  domain: String;
  available: Boolean;
}



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showData: Data[] = heliVerseData;
  obs ?: Observable<any>;
  dataSource: MatTableDataSource<Data> = new MatTableDataSource<Data>(this.showData);
  

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

   
  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    
  }
  

}
