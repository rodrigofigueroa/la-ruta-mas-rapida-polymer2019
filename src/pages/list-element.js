import { html, LitElement } from 'lit-element';

export class ListComponent extends LitElement {
    
    static get properties(){
        return {
            prop: { type: String }
        }
    }
    constructor(){
        super();
        this.prop = 'Hola que hace'
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