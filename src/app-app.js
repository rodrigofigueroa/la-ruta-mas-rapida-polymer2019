import {LitElement, html, css} from 'lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store} from './bridge/store.js';

// These are the actions needed by this element.
import {
  navigate
} from './bridge/actions/app.js';

// These are the elements needed by this element.
// import {menuIcon} from './utils/app-icons.js';

class App extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: {type: String},
      _page: {type: String}
    };
  }

  static get styles() {
      return css`
        :host {
          display: grid;
          min-height: 100vh;
          grid-template-areas:
            "header header header"
            "main   main   main"
            "footer footer footer";
          grid-template-rows: auto 1fr auto;
        }
        .header-app {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          grid-area: header;
          min-height: 60px;
          line-height: 30px;
          /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#072768+19,c00538+75 */
          background: #072768; /* Old browsers */
          background: -moz-linear-gradient(left, #072768 19%, #c00538 75%); /* FF3.6-15 */
          background: -webkit-linear-gradient(left, #072768 19%,#c00538 75%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to right, #072768 19%,#c00538 75%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#072768', endColorstr='#c00538',GradientType=1 ); /* IE6-9 */
          color: #fff;
          text-align:center;
        }
        .main-app {
          grid-area: main;
        }
        .footer-app {
          grid-area: footer;
          height: auto;
          display: flex;
          justify-content: center;
          background: #F9CE22;
          color: #D90749;
          font-weight: 900;
        }
        .container-app {
          /*padding: 15px;*/
          box-sizing: border-box;
        }
        .container-footer {
          width: 100%;
          padding: 0 15px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          /* text-align: center; */
          align-items: center;
          justify-content: space-around;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title {
          color: white;
          font-weight: lighter;
          font-size: 1.5rem;
          flex: 1 auto;
          display:flex;
          justify-content: center;
          align-items: center;
          font-weight: 500;
        }
        .navbar-principal {
          display: flex;
          flex-flow: row nowrap;
          line-height: 60px;
        }
        .navbar-principal a{
          padding: 0 15px;
          position: relative;
          border-r
        }
        .navbar-principal a.home, .navbar-principal a.default {
          transition: 1s ease all;
          font-size:1.3em;          
        }
        .navbar-principal a.home:hover, .navbar-principal a.default:hover {
          background: #fff;
          color: #c00538;
        }

        .social-github {
          display: flex;
          flex: 0 auto;
          align-items: center;
        }
        .social-github img{
          height: 60%;
        }
        .loguito{
          margin-left: 10px;
        }
        @media (max-width: 600px) {
          .header-app {
            flex-flow: column nowrap
          }
          .navbar-principal {
            flex: 1 auto;
            justify-content: center;
          }
          .navbar-principal a{
            flex: 1 auto;
          }
          .loguito {
            display: block;
            text-align: center;
            margin: 0 auto;            
          }
        }
      `;
    }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <header class="header-app">
      <img src="./images/cutmypic.png" alt="Smiley face" class="loguito" width="100px" height="50px">
        <div class="title container-app">
          ¿Donde viene mi camión?
        </div>
        <nav class="navbar-principal">
          <a class="home" ?selected="${this._page === 'home'}" href="/home">Home</a>
          <a class="default" ?selected="${this._page === 'default'}" href="/default">Ayuda</a>
        </nav>
      </header>
      <!-- Main content -->
      <main role="main" class="container-app main-app">
        ${
            this._page === 'home' ?
              html`<home-page class="page" active></home-page>` :
              ''
        }
        ${
          this._page === 'default' ?
            html`<default-page class="page" active></default-page>` :
            ''
        }
      </main>
      <footer class="footer-app">
        <div class="container-footer">
          <p>Desarrollado por team "Los Guaches".</p>          
          <p>BBVA Bancomer</p> <p>Softtek</p> <p>Google</p> <p>Singular</p>
        </div>
      </footer>
    `;
  }

  constructor() {
    super();
    // TODO Initialize properties
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
  }
}

window.customElements.define('app-app', App);
