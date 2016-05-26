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
      addProblem: this.addProblem
    });

    fetch('/user_problems', {
      credentials: 'include'
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
    });
  }
  addProblem(form) {
    fetch('/problem', {
      method: "POST",
      credentials: 'include',
      body: new FormData(form)
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
    });
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
        <form method="POST" action="/problem" id="add-probrem" onSubmit={(e) => {
          this.props.dispatch("addProblem", e.target);
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
