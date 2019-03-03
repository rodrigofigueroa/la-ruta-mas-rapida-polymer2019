import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';

class DefaultPage extends PageDM {
  static get styles() {
      return css`
        .principal-container {
          max-width: 600px;
          margin-left:auto;
          margin-right: auto;
          padding: 20px;          
        }
        .principal-container ul {
          list-style-type: none;
        }
        @media screen and (max-width: 450px){
          .principal-container{
            height: 100vh;
          }
          .principal-container {
            max-width: 600px;
            margin-left:auto;
            margin-right: auto;
            padding: 0px;          
          }
          
        }
      `;
    }

    render() {
      return html`
        <section class="principal-container">
          <h2>Preguntas</h2>
          
            <p>¿Si no encuntras una ruta?</p>
            
              <p>
                <i>Estamos en constante crecimiento puedes ayudarnos a enviarla para que la agreguemos.</i>
              </p>
            
            <p>¿La applicación no funciona?</p>
            
            <p>
                Recuerda que necesita datos y tambien tu ubucación para poder ayudarte.
              </p>
            <p>¿Dudas de como utilizar la APP o consejos?    </p>
            <p>
                Mandanos un email a <a href="emailto:">rutaextremacontacto@rutaextrema.com</a> o comunicate al 57854124545.
              </p>
        </section>
      `;
    }
}

window.customElements.define('default-page', DefaultPage);
