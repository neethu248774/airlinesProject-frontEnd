import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFlightType: string = 'roundtrip';
  
  criteria: any = {
    iata_from: '',
    iata_to: '',
    date: '',
    returningDate: '', // Only if it's a round trip
    classType: 'Economy' // Default to 'Economy class'
  };

  multiCityFlights: any[] = [];
  constructor(private router: Router,private flightService: FlightServiceService,private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  onFlightTypeChange(type: string) {
    this.selectedFlightType = type;
    if (type === 'multi-city') {
      this.multiCityFlights = [{ from: '', to: '' }];
    } else {
      this.multiCityFlights = [];
    }
  }

  addFlight() {
    this.multiCityFlights.push({ from: '', to: '' });
  }
  removeFlight(index: number) {
    if (index >= 0 && index < this.multiCityFlights.length) {
      this.multiCityFlights.splice(index, 1);
    }
  }
  showFlights() {
    // console.log('Form submitted with criteria:', this.criteria);
  
    // // Use the FlightService to make the HTTP request
    // this.flightService.getFlights(this.criteria).subscribe(
    //   (response: any) => {
    //     console.log('Flight data received from backend:', response);
  
    //     // Navigate to the flight list component with the received data and criteria
    //     this.router.navigate(['/flight-list'], { state: { flights: response, criteria: this.criteria } });
    //   },
    //   (error) => {
    //     console.error('Error fetching flight data:', error);
    //   }
    // );
    this.router.navigate(['/flight-list'], {
      queryParams: this.criteria, // Pass criteria as query parameters
    });
  }
  
  // showFlights() {
    
  //     this.router.navigate(['/flight-list']);
  //   } 
    
  
  
}
