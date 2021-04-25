import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  productsData: any=[];
  inputValue = ''
  result = {
    text: '',
    label_predict: '',
    label_probability: ''
  }

  constructor(
    public apiService: ApiService
  ) {
    this.productsData = [];
  }

  ngOnInit() {
  }

  predictBert(){
    //Get saved list of products
    const payload = {
      text: this.inputValue
    }
    this.apiService.predict(payload).subscribe(response =>{
      console.log(response);
      this.result = response
      //this.productsData = response;
      //console.log(this.productsData);
    });
  }

}