import React from 'react';
import { URL } from '../../variables';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  componentDidMount() {
    fetch(URL+'/signin/token', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      // credentials: 'include',
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
    .then(response => {
      if(response.status === 200){
        response.json()
        .then(user => {
          alert('Hi '+ user.name + ', Welcome back!')
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        })
        .catch(err => console.log('\n\nError broo in Signin Token'+err))
      }
      else{
        response.json()
        .then(msg => {
          console.log(msg);
        })
      }
    })
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch(URL+'/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      // credentials: 'include',
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => {
      if(response.status === 200){
        response.json()
        .then(user => {
          localStorage.setItem('token', user.token);
          this.props.loadUser(user.doc);
          this.props.onRouteChange('home');
        })
        .catch(err => console.log('\n\nError broo in Signin'+err))
      }
      else{
        response.json()
        .then(msg => {
          alert(msg);
        })
      }
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
