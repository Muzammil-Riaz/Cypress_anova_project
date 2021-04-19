// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')

cy.on('uncaught:exception', err => {
    return !err.message.includes(`Cannot read property '__error' of null`);
  });

  Cypress.on('window:before:load', win => {
    const origSend = win.XMLHttpRequest.prototype.send;
    win.XMLHttpRequest.prototype.send = function () {
        // deferring because your app may be using an abstraction (jquery),
        // which may set this handler *after* it sets the `send` handler
        setTimeout(() => {
            const origHandler = this.onreadystatechange;
            this.onreadystatechange = function () {
                if ( this.readyState === 4 && this.status >= 500 ) {
                    throw new Error(`Server responded to "${this.url}" with ${this.status}`);
                }
                if ( origHandler ) {
                    return origHandler.apply(this, arguments);
                }
            };
            return origSend.apply(this, arguments);
        });
    };
});
