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
import { swapiApi, localStorageApi } from "@services";
import "./App.scss";
import { useEffect } from "react";

function App() {
  const pages = ["people", "starships", "planets"];
  const [states, setState] = useState({
    people: [],
    planets: [],
    starships: [],
  });
  useEffect(() => {
    async function fillStorage() {
      const { status, message } = localStorageApi({ arr: pages });
      if (status) {
        setState({ ...message });
      } else {
        for (const page of pages) {
          message[page] = message[page] ? message[page] : await swapiApi(page);
          localStorage.setItem(page, JSON.stringify(message[page]));
        }
        setState({ ...message });
      }
    }
    fillStorage();
  }, []);

  function update({ container, value }) {
    return container.map((state) => {
      if (state.name === value.name) {
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
          initialState={states["planets"]}
          setNewState={(state) => {
            setState({ ...states, planets: [].concat(state) });
          }}
        />
      ),
    },
    {
      name: "starships",
      path: "/starship",
      text: "Starship's",
      exact: false,
      component: () => (
        <StarshipsPage
          initialState={states["starships"]}
          setNewState={(state) => {
            setState({ ...states, starshipsships: [].concat(state) });
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
          setNewState={({ intention, targetState, values }) => {
            if (intention === "update") {
              const updatedContainer = update({
                container: states[targetState],
                value: values,
              });
              localStorage.setItem(
                targetState,
                JSON.stringify(updatedContainer)
              );
              setState({
                ...states,
                [targetState]: [].concat(updatedContainer),
              });
            } else {
              localStorage.setItem(
                targetState,
                JSON.stringify(states[targetState].concat({ ...values }))
              );
              setState({
                ...states,
                [targetState]: states[targetState].concat({
                  ...values,
                }),
              });
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
