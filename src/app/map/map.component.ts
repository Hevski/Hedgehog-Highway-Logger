import { MapService } from './map.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Draw, Modify, Snap } from 'ol/interaction';
import { HighwayService } from './highway/highway.service'
import { Highway } from './highway/highway.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  snap: any;
  draw: any;
  vectorSource: any;
  modify: any;
  highwaySaved: boolean = false;
  opened: boolean = false;
  name = ''
  highwayLocations: any;
  
  constructor(
    private mapService: MapService,
    public activeModal: NgbActiveModal,
    private highwayService: HighwayService
  ) { }
  
  ngOnInit() {
    // load coords and make map with data
    this.mapService.initialiseMap();
    this.getAllHighways()
  }   
            
  /**
   * Adds interactions to the map
   */
  addInteractions() {
    this.toggleSidebar();
    this.draw = new Draw({
      source: this.mapService.vectorSource,
      type: 'Point'
    });
    this.mapService.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.mapService.vectorSource });
    this.mapService.map.addInteraction(this.snap);
    this.modify = new Modify({ source: this.mapService.vectorSource });
    this.mapService.map.addInteraction(this.modify);
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  saveHighway() {
    const highwayCoordinatesArray = this.mapService.getHighwayCoordinates();
    const payLoad: Highway = {
      name: this.name,
      lat: highwayCoordinatesArray[0][0].toString(),
      lng: highwayCoordinatesArray[0][1].toString()
    };
    console.log(payLoad)
    this.highwayService.addHighway(payLoad).subscribe(
      res => {
        this.highwaySaved = true;
      },
      error => {
        this.highwaySaved = false;
      }
      )
  }

  getAllHighways() {
    this.highwayService.getAllHighways().subscribe(
      res => {
        let lat = res.highway[0].lat
        let lng = res.highway[0].lng
        this.highwayLocations = [lat, lng]
      }
    )
  }

  deleteHighway() {
    this.highwayService.deleteHighway().subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
          
