import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})

export class HomePage implements OnInit {
  mapRef!: google.maps.Map;

  constructor(
    private loadingCtrl: LoadingController,
    
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    const mapEle: HTMLElement | null = document.getElementById('map');
    if (!mapEle) {
      console.error('Elemento #map no encontrado en el documento');
      return;
    }
  
    this.mapRef = new google.maps.Map(mapEle,{
      center: {lat: 4.6486259, lng: -74.2478946},
      zoom: 8
    });
  
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () =>{
      loading.dismiss();
    });
  }
}