import { html, LitElement } from 'lit-element';

document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const truck1 = db.colledtion('trucks').doc('truck1');
    truck1.onSnapshot( doc => {
        const data = doc.data()
        document.write(data)
        console.log(data);
    }  
        )
})

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

    

   render(){
    return html `
        <ul>
            <li> bus1 </li>
            <li> bus2 </li>
            <li> bus3 </li>
        </ul>
    `;
   }
}
window.customElements.define('list-component', ListComponent);