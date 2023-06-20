import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
    ngOnInit() {
      console.log(this.coordinates);
    this.requestHttp();
    this.requestHttp1();
  }

  constructor(private http:HttpClient) {}
  crimeCategory:any = [];
  crimedate:any = [];
  crime: string = "";
  date: string = "";
  county: string = "";
  url: string = "";
  finaldata:any =[];
  latitude: any = "";
  longitude: any = "";
  totalcrime: any = "";


  coordinates = [
  {
    "County": "Hampshire",
    "Lat":"51.083332999235274",
    "log":"-1.1666669999999997", 
  },
  {
    "County": "Cornwall",
    "Lat":"50.41666699936132",
    "log":"-4.75",

  },
   {
    "County": "Dorset",
    "Lat":"50.74999999929483",
    "log":"-2.333333",

  }
  ];
   requestHttp() {
    console.log("TEST function start");
    this.http.get('https://data.police.uk/api/crime-categories?date=2011-08')
      .subscribe(data => {
        console.log(data);
        this.crimeCategory = data;
      })
  }
  
  requestHttp1() {
    
    console.log("TEST function 1");
    this.http.get('https://data.police.uk/api/crimes-street-dates')
      .subscribe(data => {
        console.log(data);
        this.crimedate = data;
      })
  }

  takedata() {
    console.log(this.crime);
    console.log(this.date);
    console.log(this.county);
    if (this.county="Dorset") {
      this.latitude = this.coordinates[2].Lat;
      this.longitude = this.coordinates[2].log;
      

    } else if (this.county="Cornwall") {
      this.latitude = this.coordinates[1].Lat;
      this.longitude = this.coordinates[1].log;
    } else {
      this.latitude = this.coordinates[0].Lat;
      this.longitude = this.coordinates[0].log;
    }
    console.log(this.latitude);
    console.log(this.longitude);



    this.url = `https://data.police.uk/api/crimes-street/`+ this.crime +`?lat=`+ this.latitude +`&lng=`+this.longitude+`&date=`+ this.date;
 ;
    console.log(this.url);
    this.http.get(this.url)
      .subscribe(data => {
        console.log(data);
        this.finaldata = data;
        console.log(this.finaldata.length);
        this.totalcrime = this.finaldata.length;
        this.county = "";
      })

  }


} 
