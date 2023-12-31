import { useState } from 'react';
import React from 'react';
import './App.css';
import MainMint from './MainMint'
import Navbar from './Navbar';

function App() {
  const [ accounts, setAccounts] = useState([]);

  return (
    <div className="">
    <div className="overlay">
    <Navbar accounts={accounts} setAccounts={setAccounts}/>
    <MainMint accounts={accounts} setAccounts = {setAccounts}/>
    </div>
    <div className="moving-background"></div>
    </div>
  );
}

export default App;
