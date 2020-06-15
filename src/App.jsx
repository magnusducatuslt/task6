import React, { useState } from "react";
import { PeoplePage, PlanetsPage, StarshipsPage } from "./components/pages";
import { NavBar } from "./components/common";
import { Switch, Route, Redirect } from "react-router-dom";
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
  return (
    <div className="App">
      <NavBar
        links={[
          { to: "/people", text: "People's" },
          { to: "/planets", text: "Planet's" },
          { to: "/starship", text: "Starship's" },
        ]}
      />
      <div>
        <Switch>
          <Redirect exact from="/" to="/people" />
          <Route path="/people">
            <PeoplePage
              initialState={states["people"]}
              setNewState={(state) => {
                setState({ ...states, people: state });
              }}
            />
          </Route>
          <Route path="/planets">
            <PlanetsPage
              initialState={states["planet"]}
              setNewState={(state) => {
                setState({ ...states, planet: state });
              }}
            />
          </Route>
          <Route path="/starship">
            <StarshipsPage
              initialState={states["ship"]}
              setNewState={(state) => {
                setState({ ...states, ship: state });
              }}
            />
          </Route>
          <Route
            path="/not-found"
            exact={true}
            component={() => (
              <div>
                <h1>not fount 404</h1>
              </div>
            )}
          />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
