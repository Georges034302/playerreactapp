import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const PlayerList = () => {

  const [players, setplayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/players')
      .then(response => response.json())
      .then(data => {
        setplayers(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/player/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedplayers = [...players].filter(i => i.id !== id);
      setplayers(updatedplayers);
    });
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  const playerList = players.map(player => {    
    return <tr key={player.id}>
      <td style={{whiteSpace: 'nowrap'}}>{player.id}</td>
      <td style={{whiteSpace: 'nowrap'}}>{player.name}</td>
      <td style={{ whiteSpace: 'nowrap' }}>{player.score}</td>
      <td style={{whiteSpace: 'nowrap'}}>{player.rating}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/update/"+player.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(player.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container>       
        <h3>Game Scoreboard <Button color="success" tag={Link} to="/add/">Add player</Button></h3>
        <Table className="table table-borderless table-hover">
          <thead>
          <tr>
            <th width="10%">ID</th>
            <th width="10%">NAME</th>
            <th width="10%">SCORE</th>
            <th width="10%">RATING</th>
            <th width="1%"></th>
          </tr>
          </thead>
          <tbody>
          {playerList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PlayerList;