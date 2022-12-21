import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const PlayerAdd = () => {
  const initialFormState = {
    name: "",
    score: "",
  };
  const [player, setPlayer] = useState(initialFormState);
  const navigate = useNavigate();
 
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("/api/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then(() => {
            console.log("New Player added");
    }); 
    setPlayer(initialFormState);
    navigate("/players");
  };

  const title = <h2> {"Add Player"} </h2>;

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
                Save{" "}
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

export default PlayerAdd;
