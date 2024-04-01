import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Flex } from 'antd';
import Header from './components/header';
import Tables from './components/table';
import './css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="mx-2"><Tables/></div>
    </div>
  );
}

export default App;
