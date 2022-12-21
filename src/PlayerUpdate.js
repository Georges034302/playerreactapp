import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const PlayerUpdate = () => {
  const initialFormState = {
    name: "",
    score: "",
  };
  const [player, setPlayer] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/player/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data));
  }, [id, setPlayer]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("/api/update/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then(() => {
      console.log("Player updated");
    });
    setPlayer(initialFormState);
    navigate("/players");
  };

  const title = <h2> {"Update Player"} </h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {" "}
        {title}{" "}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name"> Name </Label>{" "}
            <Input
              type="text"
              name="name"
              id="name"
              value={player.name || ""}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="address"> Score </Label>{" "}
            <Input
              type="text"
              name="score"
              id="score"
              value={player.score || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>{" "}
          <div className="row">
            <FormGroup>
              <Button color="primary" type="submit">
                Update{" "}
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/players">
                Cancel{" "}
              </Button>{" "}
            </FormGroup>{" "}
          </div>{" "}
        </Form>{" "}
      </Container>{" "}
    </div>
  );
};

export default PlayerUpdate;
