import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFlightType: string = 'roundtrip';
  multiCityFlights: any[] = [];
  constructor(private router: Router) { }

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
    // Navigate to the flight list component
    this.router.navigate(['/flight-list']);
  }
}
