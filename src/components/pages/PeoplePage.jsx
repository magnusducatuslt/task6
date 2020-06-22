import React from "react";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";
import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

export const PeoplePage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const heads = [
    "count",
    "name",
    "mass",
    "hair_color",
    "skin_color",
    "eye_color",
    "birth_year",
    "gender",
    "action",
  ];
  const body = initialState.map((people, index) => ({
    count: index + 1,
    name: people.name,
    mass: people.mass,
    hair_color: people.hair_color,
    skin_color: people.skin_color,
    gender: people.gender,
    birth_year: people.birth_year,
    eye_color: people.eye_color,
    action: (
      <ButtonDelete
        text={"Delete"}
        action={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteLine(index);
        }}
      />
    ),
  }));
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
          excluders: ["action", "count", "name"],
        }),
        targetState: "people",
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
          excluders: ["action", "count"],
        }),
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["action", "count"],
        }),
        targetState: "people",
        intention: "create",
      },
    });
  }
  return (
    <div>
      <div>
        <h1>People's Page</h1>
      </div>
      {body.length > 0 ? (
        <Table
          body={body}
          heads={heads}
          clickOnTable={handleClickOnTable}
          excluders={["action", "count"]}
        />
      ) : (
        <div>
          <h1>no records</h1>
        </div>
      )}
      <br />
      <ButtonCreate onClick={handleCreateRecord} text={`Create Person`} />
    </div>
  );
};
