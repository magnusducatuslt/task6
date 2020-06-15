import React, { useState } from "react";
import { Table, Delete, Form, Submit, Input } from "../common";
import Faker from "faker";

export const StarshipsPage = ({ initialState, setNewState }) => {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState(0);
  const [owner, setOwner] = useState("");
  function deleteLine(index) {
    initialState.splice(index, 1);
    setNewState([...initialState]);
  }
  const ships = initialState.map((ship, index) => ({
    index: index + 1,
    name: ship.name,
    speed: ship.speed,
    owner: ship.owner,
    id: ship.id,
    action: (
      <Delete
        action={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteLine(index);
        }}
        index={index}
      />
    ),
  }));
  return (
    <div>
      PlanetPage
      {ships.length > 0 ? (
        <Table
          body={ships}
          heads={["Ships", "name", "speed", "owner", "id", "action"]}
        />
      ) : (
        <div>
          <h1>no records</h1>
        </div>
      )}
      <Form
        submit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setNewState([
            ...initialState,
            {
              id: Faker.random.uuid(),
              name,
              speed,
              owner,
            },
          ]);
        }}
      >
        <Input
          label={"name"}
          action={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setName(e.target.value);
          }}
          type={"text"}
          value={name}
          name={"name"}
        />
        <Input
          label={"speed"}
          action={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSpeed(e.target.value);
          }}
          type={"number"}
          value={speed}
          name={"speed"}
        />
        <Input
          label={"owner"}
          action={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOwner(e.target.value);
          }}
          type={"text"}
          value={owner}
          name={"owner"}
        />
        <Submit text={"Submit"} />
      </Form>
    </div>
  );
};
