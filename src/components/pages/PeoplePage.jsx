import React from "react";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";

import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

export const PeoplePage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const heads = ["count", "id", "first", "last", "handle", "action"];
  const body = initialState.map((people, index) => ({
    count: index + 1,
    id: people.id,
    first: people.first,
    last: people.last,
    handle: people.handle,
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
    setNewState([...initialState]);
  }
  function handleClickOnTable({ value }) {
    history.push({
      pathname: "/form",
      state: {
        value,
        inputs: returnMeNewArrayWithOutParams({
          arr: heads,
          excluders: ["id", "action", "count"],
        }),
        targetState: "peoples",
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
          excluders: ["id", "action", "count"],
        }),
        targetState: "peoples",
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
