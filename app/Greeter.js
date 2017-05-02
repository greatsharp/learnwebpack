// Greeter.js

import React, { Component } from 'react';
import config from './config.json';

import './greeter.scss';

class Greeter extends Component{
  render() {
    return (
      <div className='root'>
        { config.greetText }
      </div>
    );
  }
}

export default Greeter;

/**
var config = require('./config.json');

module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = config.greetText;
  return greet;
};
 */