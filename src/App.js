import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

import Header from './containers/Header';
import Footer from './containers/Footer';
import ProductListContainer from './containers/ProductListContainer';
import './assets/css/App.css';

class App extends Component {
  
  render() {
    return (
        <div className="App">
          <Header/> 
          <ProductListContainer/>
          <Footer/>
        </div>
    );
  }
}

export default App;
