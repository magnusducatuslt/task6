import React from "react";
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  FormPage,
} from "./components/pages";
import { NavBar } from "./components/common";
import { Switch, Route, Redirect } from "react-router-dom";
import { returnMeUnForbiddenLinks } from "@utills";
import { connect } from "react-redux";
import { fetchRecords } from "@store";
import "./App.scss";
import { useEffect } from "react";

function App({ fetchRecords }) {
  useEffect(() => {
    fetchRecords();
  }, []);

  const routes = [
    {
      name: "people",
      path: "/people",
      text: "People's",
      exact: false,
      component: <PeoplePage />,
    },
    {
      name: "planets",
      path: "/planets",
      text: "Planet's",
      exact: false,
      component: () => <PlanetsPage />,
    },
    {
      name: "starships",
      path: "/starship",
      text: "Starship's",
      exact: false,
      component: () => <StarshipsPage />,
    },
    {
      name: "form",
      path: "/form",
      text: "add/update record",
      exact: false,
      component: () => <FormPage />,
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
const mapStateToProps = ({ recordsReducer }) => {
  return { recordsReducer };
};
const mapDispatchToProps = { fetchRecords };
export default connect(mapStateToProps, mapDispatchToProps)(App);
