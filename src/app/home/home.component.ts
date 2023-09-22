import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AutocompleteService } from '../autocomplete.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFlightType: string = 'roundtrip';

  // flyingFromSuggestions: any[] = [];
  // flyingToSuggestions: any[] = [];
  airportSuggestionsFrom: any[] = [];
  airportSuggestionsTo: any[] = [];

  criteria: any = {
    iata_from: '',
    iata_to: '',
    date: '',
    returningDate: '', // Only if it's a round trip
    classType: 'Economy' // Default to 'Economy class'
  };

  multiCityFlights: any[] = [];
  fromCode: string='';
  toCode: string='';
  constructor(private router: Router, private flightService: FlightServiceService, private http: HttpClient,private autocompleteService: AutocompleteService) {
   
   }

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
    this.router.navigate(['/flight-list'], {
      queryParams: this.criteria, // Pass criteria as query parameters
      
    });
  }

  searchAirportsFrom(searchString: string) {
    if (searchString.length >= 3) {
      console.log("this is my keyword :"+searchString)
      const requestData = { search_string: searchString };

      this.autocompleteService
        .autocompleteAirports(searchString)
        .subscribe((response) => {
          console.log("this is my response :"+response)
          this.airportSuggestionsFrom = response || [];
        });
    } else {
      this.airportSuggestionsFrom = []; // Clear suggestions if input is less than 3 characters
    }
  }
  searchAirportsTo(searchString: string) {
    if (searchString.length >= 3) {
      console.log("this is my keyword :"+searchString)
      const requestData = { search_string: searchString };

      this.autocompleteService
        .autocompleteAirports(searchString)
        .subscribe((response) => {
          console.log("this is my response :"+response)
          this.airportSuggestionsTo = response || [];
        });
    } else {
      this.airportSuggestionsTo = []; // Clear suggestions if input is less than 3 characters
    }
  }

  // searchAirports(keyword: string, inputField: string) {
  //   if (keyword.length >= 3) {

  //     console.log(`Autocompleting airports for ${inputField}: ${keyword}`);
  //     this.autocompleteService.autocompleteAirports(keyword).subscribe(
  //       (response) => {
  //         console.log(`Received autocomplete response for ${inputField}:`, response);
  //         if (inputField === 'flyingFrom') {

  //           this.flyingFromSuggestions = response.matching_airports;

  //         } else if (inputField === 'flyingTo') {

  //           this.flyingToSuggestions = response.matching_airports;

  //         }

  //       },

  //       (error) => {

  //         console.error('Autocomplete error:', error);

  //       }

  //     );

  //   } else {

  //     // Clear suggestions if input is less than 3 characters

  //     if (inputField === 'flyingFrom') {

  //       this.flyingFromSuggestions = [];

  //     } else if (inputField === 'flyingTo') {

  //       this.flyingToSuggestions = [];

  //     }

  //   }

  // }

  selectAirport(airport: any, inputField: string) {
    console.log(`Selected airport for ${inputField}:`, airport);
    if (inputField === 'iataFrom') {
      this.criteria.iata_from = airport.code;
      // this.fromCode=airport.code;
    } else if (inputField === 'iataTo') {
      this.criteria.iata_to = airport.code;
      // this.toCode=airport.code;
    }
  }
}
