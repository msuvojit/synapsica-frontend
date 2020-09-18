import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import './app.css';

import LandingPage from './views/LandingPage';

const hist = createBrowserHistory();

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisconnected: false,
    };
  }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    console.log({ condition });
    if (condition === 'online') {
      const webPing = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => this.setState({ isDisconnected: true }));
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  };

  render() {
    const { isDisconnected } = this.state;

    return (
      <Router history={hist}>
        {isDisconnected ? (
          <div className="internet-error">
            <h2 className="header-title">No internet</h2>

            <h5 className="poppins header-subtext pt-4 pb-3">
              Please Connect to internet
            </h5>
          </div>
        ) : (
          <>
            <div
              className="main-content"
              ref="mainContent"
              style={{ marginTop: '-2em' }}
            >
              <Switch>
                <Route exact path={'/'} component={LandingPage} />
              </Switch>
            </div>
          </>
        )}
      </Router>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
