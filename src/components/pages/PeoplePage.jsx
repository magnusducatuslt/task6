import React, { useState } from "react";
import { Table, Delete, Form, Submit } from "../common";
import Faker from "faker";

export const PeoplePage = ({ initialState, setNewState }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [handle, setHandle] = useState("");
  function deleteLine(index) {
    initialState.splice(index, 1);
    setNewState([...initialState]);
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
      PeoplePage
      {body.length > 0 ? (
        <Table
          body={body}
          heads={["count", "id", "first", "last", "handle", "action"]}
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
            { id: Faker.random.uuid(), first, last, handle },
          ]);
        }}
      >
        <label>
          First:
          <input
            type="text"
            name="first"
            value={first}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFirst(e.target.value);
            }}
          />
        </label>
        <label>
          Last:
          <input
            type="text"
            name="last"
            value={last}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLast(e.target.value);
            }}
          />
        </label>
        <label>
          Handle:
          <input
            type="text"
            name="handle"
            value={handle}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setHandle(e.target.value);
            }}
          />
        </label>
        <Submit text={"Submit"} />
      </Form>
    </div>
  );
};
