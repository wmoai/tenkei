import React from 'react';
import {render} from 'react-dom';
import MicroContainer from 'react-micro-container';


class Container extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.subscribe({
      addProbrem: this.addProbrem
    });
  }
  addProbrem(body) {
    console.log(`add probrem ${body}`);
  }
  render() {
    return (
      <div>
        <Midgard dispatch={this.dispatch} {...this.state} />
        <Asgard dispatch={this.dispatch} {...this.state} />
      </div>
    );
  }
}

class Midgard extends React.Component {
  render() {
    return (
      <div id="midgard">
        <h3>人間界</h3>
        <form method="POST" action="/probrem" id="add-probrem" onSubmit={(e) => {
          this.props.dispatch('addProbrem', e.target.body.value);
          e.target.body.value = '';
          e.preventDefault();
        }}>
          <input type="text" name="body" />
          <input type="submit" value="+" />
        </form>
      </div>
    );
  }
}

class Asgard extends React.Component {
  render() {
    return (
      <div id="asgard">
        <h3>神界</h3>
      </div>
    );
  }
}

window.onload = () => {
  render(
    <Container />,
    document.querySelector('#contents')
  );
}
