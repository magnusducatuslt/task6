import React from "react";
import { connect } from "react-redux";
import { setRecord, deleteOneRecord } from "@store";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";
import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

const PeoplePage = ({ people, deleteOneRecord }) => {
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
  const body = people.map((elem, index) => ({
    count: index + 1,
    name: elem.name,
    mass: elem.mass,
    hair_color: elem.hair_color,
    skin_color: elem.skin_color,
    gender: elem.gender,
    birth_year: elem.birth_year,
    eye_color: elem.eye_color,
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
    deleteOneRecord({
      target: "people",
      index,
    });
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

const mapStateToProps = ({ recordsReducer: { people } }) => {
  return { people };
};
const mapDispatchToProps = { setRecord, deleteOneRecord };
export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
