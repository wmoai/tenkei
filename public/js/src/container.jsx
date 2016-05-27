import React from 'react';
import {render} from 'react-dom';
import MicroContainer from 'react-micro-container';

function request(path, options, cb) {
  fetch(path, Object.assign({
    method: 'GET',
    credentials: 'include'
  }, options)).then(response => {
    return response.json();
  }).then(json => {
    if (cb) cb(json);
  });
}

class Container extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      problem: null
    };
  }
  componentDidMount() {
    this.subscribe({
      postProblem: this.postProblem,
      showProblem: this.showProblem,
      postMemo: this.postMemo
    });
    this.loadProblem();
  }
  loadProblem() {
    request('/user_problems', {}, json => {
      this.setState({
        problems: json
      });
    });
  }
  postProblem(form) {
    if (!form.body || form.body.value == '') {
      return
    }
    request(form.action, {
      method: 'POST',
      body: new FormData(form)
    }, json => {
      this.loadProblem();
    });
  }
  showProblem(a) {
    request(a.href, {}, json => {
      this.setState({
        problem: json
      });
    });
  }
  postMemo(form) {
    request(form.action, {
      method: 'POST',
      body: new FormData(form)
    }, json => {
      this.setState({
        problem: json
      });
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
        <h2>人間界</h2>
        <form method="POST" action="/problem" id="add-probrem" onSubmit={e => {
          this.props.dispatch("postProblem", e.target);
          e.target.body.value = '';
          e.preventDefault(); }}>
          <input type="text" name="body" />
          <input type="submit" value="+" />
        </form>
        <div className="box">
          <Problems {...this.props} />
          <Problem {...this.props} />
        </div>
      </div>
    );
  }
}

class Problems extends React.Component {
  render() {
    return (
      <ul id="midgard-list">
        {this.props.problems.map(problem => {
          return  (
            <li key={problem.id}>
              <a href={`/problem/${problem.id}`} onClick={e => {
                this.props.dispatch("showProblem", e.target);
                e.preventDefault(); }}>
                {problem.body}
              </a>
          </li>
          ); 
        })}
      </ul>
    );
  }
}

class Problem extends React.Component {
  componentDidUpdate() {
    if (this.props.problem) {
      this.refs.memo.value = this.props.problem.memo;
    }
  }
  render() {
    if (!this.props.problem) {
      return null;
    }
    const problem = this.props.problem;
    return (
      <div>
        <h3>{problem.body}</h3>
        <form method="POST" action={`/problem/${problem.id}/memo`} onSubmit={e => {
          this.props.dispatch("postMemo", e.target);
          e.preventDefault(); }}>
          <p className="label">memo</p>
          <textarea id="midgard-memo" name="memo" ref="memo" />
          <br/>
          <input type="submit" value="send" />
        </form>
      </div>
    );
  }
}

class Asgard extends React.Component {
  render() {
    return (
      <div id="asgard">
        <h2>神界</h2>
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
