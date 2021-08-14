import React, { Component } from 'react';
import Cookies from 'js-cookie'

import Landing from "./pages/landing"

import loading from "../../static/assets/loading.gif"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      userToken: Cookies.get("token"),
      user: {},
      loading: true
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(user) {
    Cookies.set("token", user.token, { expires: 1825 })
    this.setState({
      userToken: Cookies.get("token"),
      user: user
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <div className='app'>
        {this.state.userToken
        ?
        this.state.loading
          ?
          <img src={loading} alt="Loading"/>
          :
          <h1>Logged In</h1>
        :
        <Landing handleSuccessfulAuth={this.handleSuccessfulAuth} />}
      </div>
    );
  }
}
