import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerList from './PlayerList';
import PlayerAdd from './PlayerAdd';
import PlayerUpdate from './PlayerUpdate';
import Players from './Players';

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Route exact path="/" element={<Players/>}/> */}
        <Route exact path="/" element={<Home/>}/>
        <Route path='/players' exact={true} element={<PlayerList />} />
        <Route path='/add' element={<PlayerAdd />} />
        <Route path='/update/:id' element={<PlayerUpdate/>}/>
      </Routes>
    </Router>
  )
}

export default App;
