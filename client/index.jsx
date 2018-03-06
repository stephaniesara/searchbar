import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './components/sidebar.jsx';
import './styles.css';
const stubdata = require('../stubdata.js');

ReactDOM.render(<SideBar stubdata={stubdata} />, document.getElementById('app'));