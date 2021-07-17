import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurants from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  let history = useHistory();

  /* create the login callback function for fetching data from Login component */
  async function login(user = null) {
    setUser(user);
    history.push("/restaurants");
  }

  async function logout(user = null) {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* navbar brand */}
        <a className="navbar-brand m-4" href="/restaurants">
          Restaurant Reviews
        </a>

        {/* navbar nav */}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>

          <li className="nav-item">
            {user ? (
              <button
                className="nav-link"
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </button>
            ) : (
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={("/", "/restaurants")}
            component={RestaurantsList}
          />

          <Route
            exact
            path="/restaurants/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />

          <Route
            path="/restaurants/:id"
            render={(props) => <Restaurants {...props} user={user} />}
          />

          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
