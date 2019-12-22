import { ModalComponent } from './../modal/modal.component';
import { MapService } from './map.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  snap: any;
  draw: any;
  vectorSource: any;
  modify: any;
  highwaySaved = false;
  
  constructor(
    private mapService: MapService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
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
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.body = 'Helloooooo';
    // this.highwaySaved = true;
  }

  // add button to save highway
  // opens modal to add name, current date, possibly e-mail address (if not doing login)
  // currently having issues with ngbmodule - something to do with ng-bootstrap
}
          
