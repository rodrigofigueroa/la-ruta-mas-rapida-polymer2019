import { html, LitElement,  css } from 'lit-element';

export class ListComponent extends LitElement {
    static get styles() {
        return css`        
          .contenedor-ps {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .contenedor-ps p{
            width: 100%;
            margin-block-start: 0;
            margin-block-end: 0;
            margin: 10px 0px;
          }
          .custom-select-dos{
            margin: 10px 0px;
            display: inline-block;
            width: 100%;
            height: calc(2.25rem + 2px);
            padding: .375rem 1.75rem .375rem .75rem;
            line-height: 1.5;
            color: #495057;
            vertical-align: middle;
            background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' v…0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
            background-size: 8px 10px;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        .container-rutas {  
          padding: 0px 15px;
        }
        .elige-rutas{
            width: 100%;
          background: #D90749;
          color:#F9CE22;
          text-align: center;
          border-radius: 10px 10px 0px 0px;
        }
        .elige-rutas h1{
          margin-block-end: 0;
          margin-block-start: 0;
        }
        `;
    }
    
    static get properties(){
        return {
            prop: { type: String }
        }
    }
    constructor(){
        super();
        this.prop = ''
    }

    getTruckData(){
        // document.addEventListener('DOMContentLoaded', event => {
            const app = firebase.app();
            const db = firebase.firestore();
            const truck1 = db.collection('trucks').doc('truck1');
            truck1.onSnapshot( doc => {
                const data = doc.data()
                // document.write(data)
                console.log(data);
                this.prop = data
            }  
                )
        // })
    }
    

   render(){
       var myvar = `Hola mundo`;
       var trucks = this.getTruckData()
       console.log('trucks'+trucks);

    return html `
    <div class="elige-rutas">
        <h1>Rutas </h1>
    </div>     
    <div class="container-rutas">               
        <select class="custom-select-dos">
            <option value="r-1">Ruta 1</option>
            <option value="r-2">Ruta 2</option>
        </select>     
        <div class="contenedor-ps">       
            <p class="cm-ruta">🚍 ${this.prop.nCamiones} autobuses en ruta</p>         
            <p class="cm-min">🕑 ${this.prop.tiempoLlegada} minutos para que llegue</p>
            <p class="cm-prox">🚏 Proxima Parada ${this.prop.nextStage}</p>
            ${this.prop.choque? html`<p> 💥 Hubo un choque demorará el Cámion </p>`:html``}
            ${this.prop.clima? html`<p> 🌧️ Esta lloviendo demorara el Cámion </p>`:html``}
            ${this.prop.desvio? html`<p> 🚌  Se desvio el camion a la siguiente parada </p>`:html``}
        </div>
    </div>
    `;
   }
}
window.customElements.define('list-component', ListComponent);