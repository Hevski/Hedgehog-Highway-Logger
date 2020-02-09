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
  highwaySaved = false;
  opened: boolean = false;
  // logDate = new Date;
  name = '' //data binding not working from form input
  
  constructor(
    private mapService: MapService,
    public activeModal: NgbActiveModal,
    private highwayService: HighwayService
  ) { }
  
  ngOnInit() {
    this.mapService.initialiseMap();
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
    const payLoad: Highway = {
      // logDate: new Date,
      name: this.name
      // location: [0, 1, 1, 0]  //getHighwayCoordinates(),
    }
    this.highwayService.addHighway(payLoad).subscribe(
      res => {
        // this.name = 'Bob'
        console.log(res)
        this.highwaySaved = true;
      }
    )
  }

}
          
