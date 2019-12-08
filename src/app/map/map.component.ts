import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import { OSM, Vector as VectorSource } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
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
  
  constructor(
    private mapService: MapService,
  ) { }
  
  ngOnInit() {
    this.mapService.initialiseMap();
    this.typeSelect = document.getElementById('type');
    this.addInteractions();
  }   
            
  /**
   * Adds interactions to the map
   */
  addInteractions() {
    this.draw = new Draw({
      source: this.mapService.vectorSource,
      type: this.typeSelect.value
    });
    this.mapService.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.mapService.vectorSource });
    this.mapService.map.addInteraction(this.snap);
    this.modify = new Modify({ source: this.mapService.vectorSource });
    this.mapService.map.addInteraction(this.modify);
  }
}
          
