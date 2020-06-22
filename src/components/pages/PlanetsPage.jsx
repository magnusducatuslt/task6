import React, { useState } from "react";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";
import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

export const PlanetsPage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const planets = initialState.map((planet, index) => ({
    count: index + 1,
    name: planet.name,
    climate: planet.climate,
    terrain: planet.terrain,
    rotation_period: planet.rotation_period,
    orbital_period: planet.orbital_period,
    gravity: planet.gravity,
    surface_water: planet.surface_water,
    population: planet.population,
    created: planet.created,
    action: (
      <ButtonDelete
        action={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteLine(index);
        }}
        index={index}
      />
    ),
  }));
  const heads = [
    "Planets",
    "name",
    "climate",
    "terrain",
    "rotation_period",
    "orbital_period",
    "gravity",
    "surface_water",
    "population",
    "created",
    "action",
  ];
  function deleteLine(index) {
    initialState.splice(index, 1);
    localStorage.setItem("planets", JSON.stringify([...initialState]));
    setNewState([...initialState]);
  }
  function handleClickOnTable({ value }) {
    history.push({
      pathname: "/form",
      state: {
        value,
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["action", "Planets", "count", "name"],
        }),
        targetState: "planets",
        intention: "update",
      },
    });
  }
  function handleCreateRecord(e) {
    e.preventDefault();
    e.stopPropagation();
    history.push({
      pathname: "/form",
      state: {
        value: returnMeCreatedObjectFromArrayWithoutParams({
          arr: heads,
          excluders: ["action", "Planets"],
        }),
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["action", "Planets"],
        }),
        targetState: "planets",
        intention: "create",
      },
    });
  }
  return (
    <div>
      <div>
        <h1>Planet's Page</h1>
      </div>
      {planets.length > 0 ? (
        <Table
          body={planets}
          heads={heads}
          clickOnTable={handleClickOnTable}
          excluders={["action", "count", "Planets"]}
        />
      ) : (
        <div>
          <h1>no records</h1>
        </div>
      )}
      <br />
      <br />
      <ButtonCreate onClick={handleCreateRecord} text={`Create Planet`} />
    </div>
  );
};
