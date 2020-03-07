import { Highway } from './highway/highway.model';
import { HighwayService } from './highway/highway.service';
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
  allHighwaysArray: Array<any>;

  constructor(
    private highwayService: HighwayService,
  ) { }

  initialiseMap(highwaysArray) {
    console.log(highwaysArray)
    this.allHighwaysArray = highwaysArray
    const point = new Point([-460940.437408841, 7546015.142254608]);
    const pointTwo = new Point([-461096.6331917382, 7545215.408649344]);
    const woodilee = [-4.14291973, 55.93130112];
    const woodileeWebMercator = fromLonLat(woodilee);
    this.vectorSource = new VectorSource({
      features: this.buildFeaturesArray()
    });
    const raster = new TileLayer({ source: new OSM() });
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
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
    console.log(this.vectorSource);
    
    console.log(highwayCoordinates);
    
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

  buildFeaturesArray() {
    let featuresArray = []
    this.allHighwaysArray.map(highway => {
      console.log(highway)
      let lat = highway.lat
      let lng = highway.lng
      const point = new Point([lat, lng]);
      featuresArray.push(new Feature(point))
    })
    console.log(featuresArray)
    return featuresArray
  }
}
