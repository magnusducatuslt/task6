import React from "react";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";

import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

export const StarshipsPage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const heads = ["Ships", "name", "speed", "owner", "id", "action"];
  const ships = initialState.map((ship, index) => ({
    count: index + 1,
    name: ship.name,
    speed: ship.speed,
    owner: ship.owner,
    id: ship.id,
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
    setNewState([...initialState]);
  }
  function handleClickOnTable({ value }) {
    history.push({
      pathname: "/form",
      state: {
        value,
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["id", "action", "Ships"],
        }),
        targetState: "ships",
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
          excluders: ["id", "action", "Ships"],
        }),
        targetState: "ships",
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
