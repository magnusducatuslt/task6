import React, { useState } from "react";
import { Table, Delete, Form, Submit } from "../common";
import { useHistory } from "react-router-dom";
import Faker from "faker";

export const PeoplePage = ({ initialState, setNewState }) => {
  const history = useHistory();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [handle, setHandle] = useState("");
  function deleteLine(index) {
    initialState.splice(index, 1);
    setNewState([...initialState]);
  }
  function handleClickOnTable(value) {
    history.push({ pathname: "/form", state: { value } });
  }
  const body = initialState.map((people, index) => ({
    index: index + 1,
    id: people.id,
    first: people.first,
    last: people.last,
    handle: people.handle,
    action: (
      <Delete
        text={"Delete"}
        action={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteLine(index);
        }}
      />
    ),
  }));
  return (
    <div>
      <div>
        <h1>People's Page</h1>
      </div>
      {body.length > 0 ? (
        <Table
          body={body}
          heads={["count", "id", "first", "last", "handle", "action"]}
          clickOnTable={handleClickOnTable}
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
            { id: Faker.random.uuid(), first, last, handle },
          ]);
        }}
        inputs={[
          {
            type: "text",
            name: "first",
            value: first,
            onChange: (e) => {
              setFirst(e.target.value);
            },
          },
          {
            type: "text",
            name: "last",
            value: last,
            onChange: (e) => {
              setLast(e.target.value);
            },
          },
          {
            type: "text",
            name: "handle",
            value: handle,
            onChange: (e) => {
              setHandle(e.target.value);
            },
          },
        ]}
      ></Form>
    </div>
  );
};
