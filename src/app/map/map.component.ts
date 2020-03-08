import { Feature } from 'ol/index';
import { Point } from 'ol/geom';
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
  allHighwaysArray: Array<any>;
  featuresArray: Array<any>;
  activeCoordinate: any;
  
  constructor(
    private mapService: MapService,
    public activeModal: NgbActiveModal,
    private highwayService: HighwayService
  ) { }
  
  ngOnInit() {
    this.highwayService.getAllHighways().subscribe(
      res => {
        this.allHighwaysArray = res.highway
        this.mapService.initialiseMap(this.allHighwaysArray);
      }
    )
  }   
            
  /**
   * Adds interactions to the map
   */
  addInteractions() {
    this.map = this.mapService.getMap();
    this.draw = new Draw({
      source: this.mapService.vectorSource,
      type: 'Point',
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.mapService.vectorSource });
    this.map.addInteraction(this.snap);
    // this.modify = new Modify({ source: this.mapService.vectorSource });
    // this.map.addInteraction(this.modify);
    this.activate();
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.removeDrawInteraction();
  }

  removeDrawInteraction() {
    this.mapService.getMap();
    this.map.removeInteraction(this.draw);
    this.map.un('singleclick', this.activate());
  }

  activate() {
    this.mapService.map.on('singleclick', function (evt) {
      this.toggleSidebar()
      this.setActiveCoordinate(evt.coordinate)
    }.bind(this));
  }

  setActiveCoordinate(coordinate) {
    this.activeCoordinate = coordinate
  }

  saveHighway() {
    const payLoad: Highway = {
      name: this.name,
      lat: this.activeCoordinate[0].toString(),
      lng: this.activeCoordinate[1].toString()
    };
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
        this.allHighwaysArray = res.highway
      })
  }
  
  deleteHighway() {
    this.highwayService.deleteHighway().subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
          
