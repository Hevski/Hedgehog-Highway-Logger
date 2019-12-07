import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
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
  
  constructor() { }
  
  ngOnInit() {
    this.initialiseMap();
    this.typeSelect = document.getElementById('type');
    this.addInteractions();
  }   
              // this.map.addLayer(this.vectorLayer);
              // this.vectorLayer.setZIndex(999);
            
  initialiseMap() {
    const woodilee = [-4.14291973, 55.93130112,];
    const woodileeWebMercator = fromLonLat(woodilee);
    this.vectorSource = new VectorSource();
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
              color: '#ffcc33',
              width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                  })
                })
              })
    });
    
    this.map = new Map({
      layers:[raster, vectorLayer],
      target: 'map',
      view: new View({
        center: woodileeWebMercator,
        zoom: 15,
      })
    });
  }
  
  addInteractions() {
    this.draw = new Draw({
      source: this.vectorSource,
      type: this.typeSelect.value
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.vectorSource });
    this.map.addInteraction(this.snap);
  }
}
          
