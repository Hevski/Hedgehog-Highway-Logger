import { Injectable } from '@angular/core';
import 'ol/ol.css';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Map, View, Feature } from 'ol/index';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  vectorSource: any;
  map: any;

  constructor() { }

  initialiseMap() {
    const point = new Point([-460940.437408841, 7546015.142254608]);
    const woodilee = [-4.14291973, 55.93130112];
    const woodileeWebMercator = fromLonLat(woodilee);
    this.vectorSource = new VectorSource();
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature(point)
        ]
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#362503',
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#362503'
          })
        })
      })
    });

    this.map = new Map({
      layers: [raster, vectorLayer],
      target: 'map',
      view: new View({
        center: woodileeWebMercator,
        zoom: 15,
      })
    });
  }

  getHighwayCoordinates() {
    const highwayCoordinates = this.vectorSource.getFeatures();
    let geometryCoordinates = []
    // Go through this array and get coordinates of their geometry.
    highwayCoordinates.forEach(function (highway) {
       geometryCoordinates.push(highway.getGeometry().getCoordinates())
      });

    return geometryCoordinates;
    }

  getMap() {
    return this.map;
  }
}
