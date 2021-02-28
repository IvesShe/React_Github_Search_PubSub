import React, { Component } from 'react'
import List from './componets/List';
import Search from './componets/Search';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>使用消息訂閱的方式</h1><br/>
          <Search />
          <List />
        </div>
      </div>
    );
  }
}