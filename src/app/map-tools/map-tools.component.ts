import { MapService } from '../map/map.service';
import { Component, OnInit } from '@angular/core';
import DragZoom from 'ol/interaction/DragZoom';
import { always } from 'ol/events/condition.js';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit {
  dragZoomIn: any;
  dragZoomOut: any;

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit() {
    this.initMapTools();
  }

  initMapTools() {
    this.dragZoomIn = new DragZoom({
      condition: always,
      out: false,
    });
    this.dragZoomOut = new DragZoom({
      condition: always,
      out: true,
    });
  }

  zoomIn(): void {
    this.mapService.map.addInteraction(this.dragZoomIn);
  }

  zoomOut(): void {
    this.mapService.map.addInteraction(this.dragZoomOut);
  }

}
