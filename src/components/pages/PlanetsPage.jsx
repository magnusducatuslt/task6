import React from "react";
import { connect } from "react-redux";
import { setRecord, deleteOneRecord } from "@store";
import { Table, ButtonDelete, ButtonCreate } from "../common";
import { useHistory } from "react-router-dom";
import {
  returnMeNewArrayWithOutParams,
  returnMeCreatedObjectFromArrayWithoutParams,
} from "@utills";

const PlanetsPage = ({ planet, deleteOneRecord }) => {
  const history = useHistory();
  const planets = planet.map((elem, index) => ({
    count: index + 1,
    name: elem.name,
    climate: elem.climate,
    terrain: elem.terrain,
    rotation_period: elem.rotation_period,
    orbital_period: elem.orbital_period,
    gravity: elem.gravity,
    surface_water: elem.surface_water,
    population: elem.population,
    created: elem.created,
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
    deleteOneRecord({
      target: "planets",
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

const mapStateToProps = ({ recordsReducer: { planets } }) => {
  return { planet: planets };
};
const mapDispatchToProps = { setRecord, deleteOneRecord };
export default connect(mapStateToProps, mapDispatchToProps)(PlanetsPage);
