import { Component,ViewChild,HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { NgForm } from '@angular/forms';

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    
    const scrollPosition = window.scrollY;
    this.isSticky = scrollPosition > 1; 
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showData: Data[] = heliVerseData;
  searchTerm: string = '';
  filteredData: Data[] = [];
  totalData: Data[] = [];
  cart:Data[]=[];
  selectedFilter: string = 'all';

  filterData() {
    const startIndex = this.paginator.pageIndex * 20;
    const endIndex = startIndex + 20;
    if (this.searchTerm == '') {
      this.filteredData = this.showData
    }
    else {
      console.log(this.showData)
      //this.filteredData = this.showData.filter(item => item.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.filteredData = this.showData
        .filter(item => item.email.toLowerCase().includes(this.searchTerm.toLowerCase())).slice(startIndex, endIndex);
      this.totalData = this.showData
        .filter(item => item.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
      console.log(this.filteredData)

    }



  }

  filterData1() {
    const startIndex = this.paginator.pageIndex * 20;
    const endIndex = startIndex + 20;


    if (this.selectedFilter === 'all') {
      // Show all data
      this.filteredData = this.showData;
    } else if (this.selectedFilter === 'gender') {
      this.filteredData = this.showData
        .filter(item => item.gender.toLowerCase().includes(this.searchTerm.toLowerCase())).slice(startIndex, endIndex);
      this.totalData = this.showData
        .filter(item => item.gender.toLowerCase().includes(this.searchTerm.toLowerCase()))
    } else if (this.selectedFilter === 'domain') {
      this.filteredData = this.showData
        .filter(item => item.domain.toLowerCase().includes(this.searchTerm.toLowerCase())).slice(startIndex, endIndex);
      this.totalData = this.showData
        .filter(item => item.domain.toLowerCase().includes(this.searchTerm.toLowerCase()))
    } else {
      this.filteredData = this.showData
        .filter(item => item.available.toString().toLowerCase().includes(this.searchTerm.toLowerCase())).slice(startIndex, endIndex);
      this.totalData = this.showData
        .filter(item => item.gender.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  }


  addToCart(product: any): void {
    this.cart.push(product);
  }
  clearCart(): void {
    this.cart = [];
  }

  getItems(): Data[] {
    return this.cart;
  }

  showItems(){
    this.filteredData = this.getItems()
    this.totalData = this.getItems()
  }
}
