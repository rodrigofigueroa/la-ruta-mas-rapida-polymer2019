import {html} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';
import './list-element';

class HomePage extends PageDM {
  render() {
    return html`
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page</p>
      </section>
      <list-component></list-component>
    `;
  }
}

window.customElements.define('home-page', HomePage);
