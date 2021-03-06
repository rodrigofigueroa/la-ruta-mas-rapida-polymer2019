import {html, css} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';
import './list-element.js';
import './maps-element.js';

class HomePage extends PageDM {
  static get styles() {
    return css`
    
      .container-mapa {
        padding: 10px;        
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
      .container-mapa .mapa{
        width: 60%;
        border-radius: 10px;
        background: #f2f2f2;        
        overflow: hidden;
        order: 1;
      }
      .rutas{
        transform: translateY(2px);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px, rgba(0, 0, 0, 0.05) 0px 1px 1px;
        transition: 1s ease all;
      }
        .rutas:hover{
          transform: translateY(0px);
          box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 80px, rgba(0, 0, 0, 0.05) 0px 5px 20px;
          cursor:pointer;
        }
    article.rutas{
        width: 35%;        
        border-radius: 10px;
        order: 2;
      }
     
    section > article.mapa > mapa-element{
          width: auto!important; 
    }
    #map, #map > div{
      border-radius: 10px;
    }
    .xtreme {
      background:#213872;
      color: #D90749;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0px;
    }
    .xtreme h2{
      margin-block-start: 0;
      margin-block-end: 0;      
      font-family: 'Bangers', cursive;
      font-size: 50px;
    }
    .xtreme span {
      transform: skew(0deg);
      margin-left: 15px;
      color: #F9CE22;
      font-weight: 900;
      font-family: 'Bangers', cursive;
      letter-spacing: 1.5px;
    }

    @media screen and (max-width: 740px){
      .container-mapa .mapa{
        width: 100%;
        background: #f2f2f2;
        border-radius: 10px;        
      }
      .container-mapa .rutas{
        width: 100%;        
        border-radius: 10px;        
      }
      .container-mapa .mapa{        
        order: 2;
        margin-top: 15px;
      }
      .container-mapa .rutas{   
        order: 1;
      }
      section.xtreme > img {
        display: none;
      }
    }
    `;
  }

  render() {
    return html`
      <section class="container-mapa">      
          <article class="mapa">
            <mapa-element style="height:65vh;width:80vw" selectLocationMode></mapa-element>
          </article>
          <article class="rutas">        
              <list-component></list-component>
          </article>      
      </section>
      <section class="xtreme">
        <h2 >Xtreme </h2><span> RUTAS</span>
        <img src="https://resources.redbull.com/logos/redbullcom/v1/redbullcom-logo.svg" alt="Smiley face" class="loguito" >        
      </section>

      <script>
            const googleMapsLimitedRef = document.querySelector("mapa-element");
            googleMapsLimitedRef.apiKey = "AIzaSyBofyebOA_vPYkqLekj1s032wsngQKUnOo";
            googleMapsLimitedRef.markers = [
              {
                position: {lat:41, lng:-112},
                InfoWindowContent: "<h3>The Salt Lake City, UT Temple</h3>"
              },
              {
                position: {lat:33, lng:-117},
                InfoWindowContent: "<h3>The San Diego, CA Temple</h3>"
              },
              {
                position: {lat:29, lng:-82},
                InfoWindowContent: "<h3>The Orlando, FL Temple</h3>"
              },
              {
                position: {lat:43, lng:-70},
                InfoWindowContent: "<h3>The Cape Elizabeth, ME Temple</h3>"
              }
            ]
            function changeMarkers(e) {
              console.log(e);
              googleMapsLimitedRef.markers = [              
              {
                position: {lat:50, lng:-112},
                InfoWindowContent: "<h3>Not The Salt Lake City, UT Temple</h3>"
              },
              {
                position: {lat:33, lng:-117},
                InfoWindowContent: "<h3>The San Diego, CA Temple</h3>"
              },
              {
                position: {lat:29, lng:-82},
                InfoWindowContent: "<h3>The Orlando, FL Temple</h3>"
              }]
            }
          </script>
    `;
  }
}

window.customElements.define('home-page', HomePage);
