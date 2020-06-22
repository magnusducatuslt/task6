import React, { useState } from "react";
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  FormPage,
} from "./components/pages";
import { NavBar } from "./components/common";
import { Switch, Route, Redirect } from "react-router-dom";
import { returnMeUnForbiddenLinks } from "@utills";
import Faker from "faker";

import "./App.scss";

function App() {
  const [states, setState] = useState({
    people: [
      {
        id: Faker.random.uuid(),
        first: Faker.internet.userName(),
        last: Faker.internet.userName(),
        handle: Faker.internet.email(),
      },
      {
        id: Faker.random.uuid(),
        first: Faker.internet.userName(),
        last: Faker.internet.userName(),
        handle: Faker.internet.email(),
      },
      {
        id: Faker.random.uuid(),
        first: Faker.internet.userName(),
        last: Faker.internet.userName(),
        handle: Faker.internet.email(),
      },
    ],
    planet: [
      {
        id: Faker.random.uuid(),
        name: Faker.company.companyName(),
        climate: Faker.internet.color(),
        terrain: Faker.internet.domainSuffix(),
        diametr: Faker.finance.mask(),
        population: Faker.finance.amount(),
        created: `${Faker.date.future()}`,
      },
    ],
    ship: [],
  });
  function update({ container, value }) {
    return container.map((state) => {
      if (state.id === value.id) {
        return value;
      }
      return state;
    });
  }
  const routes = [
    {
      name: "people",
      path: "/people",
      text: "People's",
      exact: false,
      component: (
        <PeoplePage
          initialState={states["people"]}
          setNewState={(state) => {
            setState({ ...states, people: [].concat(state) });
          }}
        />
      ),
    },
    {
      name: "planets",
      path: "/planets",
      text: "Planet's",
      exact: false,
      component: () => (
        <PlanetsPage
          initialState={states["planet"]}
          setNewState={(state) => {
            setState({ ...states, planet: [].concat(state) });
          }}
        />
      ),
    },
    {
      name: "starship",
      path: "/starship",
      text: "Starship's",
      exact: false,
      component: () => (
        <StarshipsPage
          initialState={states["ship"]}
          setNewState={(state) => {
            setState({ ...states, ship: [].concat(state) });
          }}
        />
      ),
    },
    {
      name: "form",
      path: "/form",
      text: "add/update record",
      exact: false,
      component: () => (
        <FormPage
          setNewState={({ intention, key, value }) => {
            if (intention === "update") {
              const updatedContainer = update({
                container: states[key],
                value,
              });
              setState({ ...states, [key]: [].concat(updatedContainer) });
            } else {
              setState({ ...states, [key]: [].concat(value) });
            }
          }}
        />
      ),
    },
    {
      name: "not-found",
      path: "/not-found",
      exact: true,
      component: () => (
        <div>
          <h1>not fount 404</h1>
        </div>
      ),
    },
  ];
  const navabarForbiddenLinks = ["form", "not-found"];
  const navbarValidLinks = returnMeUnForbiddenLinks({
    container: [].concat(routes),
    forbidden: [].concat(navabarForbiddenLinks),
  });
  return (
    <div className="App">
      <NavBar links={navbarValidLinks} />
      <div>
        <Switch>
          <Redirect exact from="/" to="/people" />
          {routes.map(({ path, exact, component }, index) => (
            <Route key={`${Date.now()}/${index}`} path={path} exact={exact}>
              {component}
            </Route>
          ))}
          <Redirect from="*" to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
