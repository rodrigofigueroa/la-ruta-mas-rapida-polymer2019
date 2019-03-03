import { html, LitElement } from 'lit-element';
window.initMap = function () { window.dispatchEvent(new CustomEvent('google-map-ready')); }; // eslint-disable-line no-unused-vars

export class MapsElement extends LitElement {
    static get properties(){
        return {
            apiKey: {type: String},
            lang: {type: String},
            inChina: {type: Boolean},
            markers: {type: Object},
            selectedMarkerId: {type: String},
            icon: {type: String},
            selectedIcon: {type: String},
            selectLocationMode: {type: Boolean},
            selectedInfoWindowContent: {type: String},
            long: {type:String},
            lat: {type:String}
        }
    }
    constructor(){
        super()
        this.lat = 19.428475;
        this.long = -99.206574;
        window.addEventListener('google-map-ready', () => {
            this._mapRef = new google.maps.Map(this.shadowRoot.querySelector('#map'), {
              center: { lat: this.lat, lng: this.long },
              zoom: 16,
              streetViewControl: false,
            });
            this._putMarkersOnMap(this._markers);
            this._infoWindow = new google.maps.InfoWindow(
                {content: document.createElement('div')}
            );
            this._infoWindow.addListener('closeclick', () => {
                this.selectedMarkerId = null;
            });
            if(this.selectLocationMode) {
                google.maps.event.addListener(this._mapRef, 'click', (event) => {
                if(this._mapMarkers) this._mapMarkers.map((marker) => marker.setMap(null));
                this.markers = [{
                    position: {lat:event.latLng.lat(), lng:event.latLng.lng()},
                    InfoWindowContent: this.selectedInfoWindowContent || "User Selected Point"
                }];
             this.dispatchEvent(new CustomEvent('lag-long-chosen', {bubbles:true, composed:true, detail:{lat:event.latLng.lat(), long: event.latLng.lng()}}));
             this._mapRef.setZoom(5);
            });
            }
          });
            this.icon = this.icon || 'camioncito.svg';
            this.selectedIcon = this.selectedIcon || 'camioncito.svg';
    }

    getTruckData(){
      // document.addEventListener('DOMContentLoaded', event => {
          const app = firebase.app();
          const db = firebase.firestore();
          const truck1 = db.collection('trucks').doc('truck1');
          truck1.onSnapshot( doc => {
              const data = doc.data()
              // document.write(data)
              this.prop = data
              console.log(this.prop)
          }  
              )
      // })
  }

    firstUpdated() {
        this.shadowRoot.appendChild(this._mapScriptTag());
        super.firstUpdated();
    }

    _mapScriptTag() {
        const lang = 'en'
        // init google maps
        const googleMapsLoader = document.createElement('script');
        googleMapsLoader.src = `https://maps.${this.inChina ? 'google.cn' : 'googleapis.com'}/maps/api/js?key=${"AIzaSyBk3H3mZgWUkh-IKn42UQwtmNLnYvG6TqI"}&language=${lang === 'zh' ? 'zh-TW' : lang}&callback=initMap`;
        googleMapsLoader.async = true;
        googleMapsLoader.defer = true;
        return googleMapsLoader;
      }
    
      set markers(markers) {
        if(!markers) return;
        this._putMarkersOnMap(markers);
        this._markers = markers;
      }
    
      get markers() {
        return this._markers;
      }
    
      set selectedMarkerId(id) {
        if(!this._mapMarkers) return;
        let oldMapMarker = this._mapMarkers[this._selectedMarkerId]
        let newMapMarker = this._mapMarkers[id];
        let newMarker = this._markers[id];
        if(oldMapMarker) oldMapMarker.setIcon(this.icon);
        if(newMapMarker) newMapMarker.setIcon(this.selectedIcon);
        if(this._infoWindow) this._infoWindow.close();
        if(newMarker && newMarker.InfoWindowContent) {
          this._infoWindow.setContent(newMarker.InfoWindowContent);
          this._infoWindow.open(this._mapRef, newMapMarker);
        }
        this.dispatchEvent(new CustomEvent('map-pin-selected', {bubbles:true, composed:true, detail:{id:this.selectedMarkerId}}));
        this._selectedMarkerId = id;
      }
    
      get selectedMarkerId() {
        return this._selectedMarkerId;
      }

      _putMarkersOnMap(markers) {
        if(!this._mapRef || !markers) return;
        if(this._mapMarkers) this._mapMarkers.map((marker) => marker.setMap(null));
        this._mapMarkers = markers.reduce((acc, item, index) => {
          if(item.position){
            const mapMarker = new google.maps.Marker({
              position: item.position,
              icon: markers.icon || this.icon,
              map: this._mapRef
            })
            mapMarker.addListener('click', () => {
              this.selectedMarkerId = item.id || index;
            });
            acc[ item.id || index ] = mapMarker;
            return acc;
          }
          return acc;
        }, []);
        this._setDefaultBounds ();
      }

      _setDefaultBounds () {
        if (this._markers.length === 0) {
          // show the whole world if there are no markers
          var worldBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(70.4043, -143.5291), // Top-left
            new google.maps.LatLng(-46.11251, 163.4288) // Bottom-right
          );
          this._mapRef.fitBounds(worldBounds, 0);
        } else {
          var initialBounds = this._mapMarkers.reduce((bounds, marker) => {
            bounds.extend(marker.getPosition());
            return bounds;
          }, new google.maps.LatLngBounds());
          this._mapRef.fitBounds(initialBounds);
        }
      }
      

    render(){
      this.getTruckData()
      // console.log(this.prop)
      // this.lat = this.prop.latitud
      // this.long = this.prop.longitud
      
        return html `
            <style>
                :host {
                    display: block
                }
                #map {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div id="map"></div>
        `;
    }
}
window.customElements.define('mapa-element', MapsElement);