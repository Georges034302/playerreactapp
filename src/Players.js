import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Players = () => {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/players')
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Game Scoreboard</h2>
          {players.map(player =>
              <div key={player.id} style={{color: 'yellow',textAlign: "left"}}>
                  <li>{player.id}: : {player.name} - {player.score} - {player.rating}</li>
              </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Players;