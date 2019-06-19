const manualWebSocket = require('manual-web-socket');
// see https://github.com/baal-cadar/manual-web-socket
describe('Host Application', () => {
  it('host an estimation round', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        /**
         * "Install" ManualWebSocket
         */
        var script = win.document.createElement('script');
        script.innerText = manualWebSocket.getScript();
        win.document.head.appendChild(script);

        /**
         * Track WebSocket connection for "ws://localhost:3000/api/broker"
         */
        win.mws.track([
          // /127.0.0.1:3000/,
          /localhost:3000/,
          // /127.0.0.1:3210/,
          // /localhost:3210/,
        ]);
      },
    }).then(win => {
      let trackedConnection; // ManualWebSocket connection reference
      const cardClient1 = {
        type: 'card',
        card: { idx: 7, value: 8, selected: true, choosen: true },
        id: { channel: 'TestChannel', name: 'TestClient1' },
      };
      const cardClient2 = {
        type: 'card',
        card: { idx: 6, value: 5, selected: true, choosen: true },
        id: { channel: 'TestChannel', name: 'TestClient2' },
      };

      /**
       * Connect to WebSocket
       */
      cy.getByPlaceholderText(/channel/)
        .click()
        .type('TestChannel')
        .getByPlaceholderText(/name/i)
        .click()
        .type('TestHost')
        /**
         * host estimation round
         */
        .getByText(/create/i)
        .click()
        .then(() => {
          trackedConnection = win.mws.trackedConnections.getByUrl(
            'ws:localhost:3000/api/broker',
          ); // Get tracked connection
          trackedConnection.readyState = win.mws.readyState.OPEN; // Change readyState from initial `CONNECTING` to `OPEN`
        })
        .getByText(/Explain/i)
        .should('exist')
        /**
         * Switch to estimation making
         */
        .getByText(/start/i)
        .click()
        .getByText(/Wait/i)
        .should('exist')
        /**
         * receive some card messages
         */
        .then(() => {
          /**
           * Act as server and send first clients' card to WebSocket connection
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify(cardClient1),
          });
        })
        .then(() => {
          /**
           * Act as server and send second clients' card to WebSocket connection
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify(cardClient2),
          });
        })
        .getByText(/finish/i)
        .click()

        /**
         * check proper results
         */
        .getByText(/8/i)
        .getByText(/client1/i)
        .getByText(/5/i)
        .getByText(/client2/i)
        .should('exist');
    });
  });
});
