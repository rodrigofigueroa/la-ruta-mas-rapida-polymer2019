import { html, LitElement } from 'lit-element';

export class MapsElement extends LitElement {
    static get properties(){
        return {
            prop1: {type: String}
        }
    }
    constructor(){
        super()
        this.prop1 = '';
    }
    render(){
        return html `
            <h1>Mapa</h1>
        `;
    }
}
window.customElements.define('mapa-element', MapsElement);