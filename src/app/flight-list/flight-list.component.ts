import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: any[] = [];
  
  constructor(private flightService: FlightServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeState = this.route.snapshot.routeConfig?.data;
    const criteria = routeState?.criteria;
    console.log(criteria)

    if (criteria) {
      this.flightService.getFlights(criteria).subscribe(
        (data: any[]) => {
          this.flights = data; 
          console.log(this.flights);// Populate the flights array with data from the service
        },
        (error) => {
          console.error('Error fetching flight data:', error);
        }
      );
    }
  }
  
  
  
 
}

function criteria(criteria: any) {
  throw new Error('Function not implemented.');
}

