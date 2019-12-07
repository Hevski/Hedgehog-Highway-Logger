import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Projection from 'ol/proj/Projection.js';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;

  constructor() { }

  ngOnInit() {
    this.initialiseMap();
  }

  initialiseMap() {
    const woodilee = [-4.14291973, 55.93130112,];
    const woodileeWebMercator = fromLonLat(woodilee);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: woodileeWebMercator,
        zoom: 15,
      })
    });
}

}
