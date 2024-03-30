import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Flex } from 'antd';
import Header from './components/header';
import Tables from './components/table';

function App() {
  return (
    <div className="App">
      <Header/>
      <Tables/>
    </div>
  );
}

export default App;
