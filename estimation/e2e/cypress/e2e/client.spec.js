const manualWebSocket = require('manual-web-socket');
// see https://github.com/baal-cadar/manual-web-socket
describe('Host Application', () => {
  it('Connect, send and receive message, receive message, close', () => {
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
      const cardOtherClient1 = {
        type: 'card',
        card: { idx: 7, value: 8, selected: true, choosen: true },
        id: { channel: 'TestChannel', name: 'TestOtherClient1' },
      };
      const cardOtherClient2 = {
        type: 'card',
        card: { idx: 6, value: 5, selected: true, choosen: true },
        id: { channel: 'TestChannel', name: 'TestOtherClient2' },
      };

      /**
       * Connect to WebSocket
       */
      cy.getByPlaceholderText(/channel/)
        .click()
        .type('TestChannel')
        .getByPlaceholderText(/name/i)
        .click()
        .type('TestClient')
        /**
         * join estimation round
         */
        .getByText(/join/i)
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
        .then(() => {
          /**
           * Act as server and send gamestate to client
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify({
              type: 'gamestate',
              state: {
                value: 'play',
              },
            }),
          });
        })
        .getByText('3')
        .closest('button')
        .click('topRight', { force: true })
        .getByText('3')
        .closest('button')
        .click('topRight', { force: true })
        /**
         * receive some card messages from fake server
         */
        .then(() => {
          /**
           * Act as server and send first clients' card to WebSocket connection
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify(cardOtherClient1),
          });
        })
        .then(() => {
          /**
           * Act as server and send second clients' card to WebSocket connection
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify(cardOtherClient2),
          });
        })

        .then(() => {
          /**
           * Act as server and send gamestate to client
           */
          trackedConnection.reciveMessage({
            data: JSON.stringify({
              type: 'gamestate',
              state: {
                value: 'result',
              },
            }),
          });
        })

        /**
         * check proper results
         */
        .getByText(/estimation/i)
        .should('exist')
        .getByText(/3/i)
        .getByText(/testclient/i)
        .getByText(/8/i)
        .getByText(/client1/i)
        .getByText(/5/i)
        .getByText(/client2/i)
        .should('exist');
    });
  });
});
