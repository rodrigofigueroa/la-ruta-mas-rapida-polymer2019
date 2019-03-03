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
            <option value="r-3">Ruta 3</option>
            <option value="r-4">Ruta 4</option>
        </select>     
        <div class="contenedor-ps">       
            <p class="cm-ruta">🚍 5 autobuses en ruta</p>         
            <p class="cm-min">🕑 4 minutos para que llegue</p>
            <p class="cm-prox">🚏 Proxima Parada Tal</p>
            <p> 💥 Hubo un choque demorará el Cámion </p>
            <p> 🌧️ Esta lloviendo demorara el Cámion </p>
            <p> 🚌  Se desvio el camion a la siguiente parada </p>
        </div>
    </div>
    `;
   }
}
window.customElements.define('list-component', ListComponent);