import React from "react";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";

import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

export const StarshipsPage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const heads = [
    "Ships",
    "name",
    "model",
    "manufacturer",
    "cost_in_credits",
    "length",
    "crew",
    "starship_class",
    "action",
  ];
  const ships = initialState.map((ship, index) => ({
    count: index + 1,
    name: ship.name,
    model: ship.model,
    manufacturer: ship.manufacturer,
    cost_in_credits: ship.cost_in_credits,
    length: ship.length,
    crew: ship.crew,
    starship_class: ship.starship_class,
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
  function deleteLine(index) {
    initialState.splice(index, 1);
    localStorage.setItem("starships", JSON.stringify([...initialState]));
    setNewState([...initialState]);
  }
  function handleClickOnTable({ value }) {
    history.push({
      pathname: "/form",
      state: {
        value,
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["action", "Ships", "name", "count"],
        }),
        targetState: "starships",
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
          excluders: ["action", "Ships"],
        }),
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["action", "Ships"],
        }),
        targetState: "starships",
        intention: "create",
      },
    });
  }
  return (
    <div>
      <div>
        <h1>Starship's Page</h1>
      </div>
      {ships.length > 0 ? (
        <Table
          body={ships}
          heads={heads}
          clickOnTable={handleClickOnTable}
          excluders={["action", "count", "Ships"]}
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
