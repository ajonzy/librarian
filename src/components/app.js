import React, { Component } from 'react';
import Cookies from 'js-cookie'

import Landing from "./pages/landing"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      user: Cookies.get("user")
    }
  }

  render() {
    console.log(this.state.user)
    return (
      <div className='app'>
        {this.state.user 
        ?
        <h1>Logged In</h1>
        :
        <Landing />}
      </div>
    );
  }
}
