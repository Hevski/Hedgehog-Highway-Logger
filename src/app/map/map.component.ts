import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Draw, Modify, Snap } from 'ol/interaction';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  typeSelect: any;
  snap: any;
  draw: any;
  vectorSource: any;
  vectorLayer: any;
  raster: any;
  modify: any;
  highwaySaved = false;
  
  constructor(
    private mapService: MapService,
  ) { }
  
  ngOnInit() {
    this.mapService.initialiseMap();
  }   
            
  /**
   * Adds interactions to the map
   */
  addInteractions() {
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

  save() {
    this.highwaySaved = true;
  }

  // add button to save highway
  // opens modal to add name, current date, possibly e-mail address (if not doing login)
  // currently having issues with ngbmodule - something to do with ng-bootstrap
}
          
