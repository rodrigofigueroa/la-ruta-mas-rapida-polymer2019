import {html, css} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';

class HomePage extends PageDM {
  static get styles() {
    return css`
      .container-mapa {
        padding: 5px;        
        display: flex;
      }
      .container-mapa .mapa{
        width: 70%;
        background: #f2f2f2;
      }
      .container-mapa .rutas{
        width: 30%;
        background: #f2f2f2;
      }
    `;
  }

  render() {
    return html`
      <section class="container-mapa">      
          <article class="mapa">
            <p>inserta el mapa aqui</p>
          </article>
          <article class="rutas">        
            <div class="elige-rutas">
              <h1>Rutas </h1>
            </div>     
            <div class="container-rutas">            
              <select class="select-stilos">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
              </select>
              <p class="cm-ruta"> 5 Camiones en ruta</p>
              <p class="cm-min"> 5 Camiones en ruta</p>
              <p class="cm-prox"> 5 Camiones en ruta</p>
            </div>

          </article>      
      </section>
    `;
  }
}

window.customElements.define('home-page', HomePage);
