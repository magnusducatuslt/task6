import React, { useState } from "react";
import { Table, Delete, Form } from "../common";
import Faker from "faker";

export const PlanetsPage = ({ initialState, setNewState }) => {
  const [name, setName] = useState("");
  const [climate, setClimate] = useState("");
  const [terrain, setTerrain] = useState("");
  const [diametr, setDiametr] = useState("");
  const [population, setPopulation] = useState(0);
  const [created, setCreated] = useState("");
  function deleteLine(index) {
    initialState.splice(index, 1);
    setNewState([...initialState]);
  }

  const planets = initialState.map((planet, index) => ({
    index: index + 1,
    name: planet.name,
    climate: planet.climate,
    terrain: planet.terrain,
    diametr: planet.diametr,
    population: planet.population,
    created: planet.created,
    id: planet.id,
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
      <div>
        <h1>Planet's Page</h1>
      </div>
      {planets.length > 0 ? (
        <Table
          body={planets}
          heads={[
            "Planets",
            "name",
            "climate",
            "terrain",
            "diametr",
            "population",
            "created",
            "id",
            "action",
          ]}
        />
      ) : (
        <div>
          <h1>no records</h1>
        </div>
      )}
      <br />
      <Form
        submit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setNewState([
            ...initialState,
            {
              id: Faker.random.uuid(),
              name,
              climate,
              terrain,
              diametr,
              population,
              created,
            },
          ]);
        }}
        inputs={[
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setName(e.target.value);
            },
            type: "text",
            value: name,
            name: "name",
          },
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setClimate(e.target.value);
            },
            type: "text",
            value: climate,
            name: "climate",
          },
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setTerrain(e.target.value);
            },
            type: "text",
            value: terrain,
            name: "terrain",
          },
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setDiametr(e.target.value);
            },
            type: "text",
            value: diametr,
            name: "diametr",
          },
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setPopulation(e.target.value);
            },
            type: "number",
            value: population,
            name: "population",
          },
          {
            onChange: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setCreated(e.target.value);
            },
            type: "text",
            value: created,
            name: "created",
          },
        ]}
      ></Form>
    </div>
  );
};
