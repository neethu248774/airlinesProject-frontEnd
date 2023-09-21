import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: any[] = [];
  criteria: any;
  
  constructor(
    private flightService: FlightServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // ngOnInit(): void {
  //   const routeState = this.route.snapshot.data;
  //   const criteria = routeState?.criteria;
  //   console.log(criteria);

  //   if (criteria) {
  //     this.flightService.getFlights(criteria).subscribe(
  //       (data: any[]) => {
  //         this.flights = data; 
  //         console.log(this.flights); 
  //         this.router.navigate(['/flight-list'], { state: { criteria: criteria } });
  //       },
  //       (error) => {
  //         console.error('Error fetching flight data:', error);
  //       }
  //     );
  //   }
  // }


  ngOnInit(): void {
    // Access the criteria from the route state
  //   const routeState = this.route.snapshot?.data;
  //   this.criteria = routeState?.criteria;
  //   console.log("criteria")

  //   if (this.criteria) {
  //     this.flightService.getFlights(this.criteria).subscribe(
  //       (data: any[]) => {
  //         this.flights = data; 
  //         console.log(this.flights); 
  //       },
  //       (error) => {
  //         console.error('Error fetching flight data:', error);
  //       }
  //     );
  //   }
  // }
  this.route.queryParams.subscribe((queryParams) => {
    this.criteria = queryParams;
    console.log(this.criteria)

  });
  this.sendDataToBackend(this.criteria);
}
  sendDataToBackend(data:any){
    this.flightService.getFlights(data).subscribe((response)=>{
      console.log('API Response',response)
      this.flights=response;
      
    })
    
  }
}








