import React, { Component } from 'react';
import Cookies from 'js-cookie'

import Landing from "./pages/containers/landing"
import Bookcase from "./pages/containers/bookcase"

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
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  handleSuccessfulAuth(user) {
    Cookies.set("token", user.token, { expires: 1825 })
    this.setState({
      userToken: Cookies.get("token"),
      user: user,
      loading: false
    })
  }

  handleSuccessfulLogout() {
    Cookies.remove("token")
    this.setState({
      user: {},
      userToken: undefined,
      loading: false
    })
  }

  updateUser(newuserData) {
    this.setState({ user: newuserData })
  }

  componentDidMount() {
    if (this.state.userToken) {
      fetch(`https://librarianapi.herokuapp.com/user/get/${this.state.userToken}`)
      .then(response => response.json())
      .then(data => {
        if (data === "Invalid Credentials") {
          this.handleSuccessfulLogout()
        }
        else {
          this.handleSuccessfulAuth(data)
        }
      })
    }
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
          <Bookcase user={this.state.user} updateUser={this.updateUser} handleSuccessfulLogout={this.handleSuccessfulLogout} />
        :
        <Landing handleSuccessfulAuth={this.handleSuccessfulAuth} />}
      </div>
    );
  }
}
