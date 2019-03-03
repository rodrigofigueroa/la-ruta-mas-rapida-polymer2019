import { html, LitElement } from 'lit-element';

export class ListComponent extends LitElement {
    
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