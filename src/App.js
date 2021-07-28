import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review.js";
import Restaurants from "./components/restaurants.js";
import RestaurantsList from "./components/restaurants-list.js";
import Login from "./components/login";

import RestaurantDataService from "./services/restaurant.js";

function App() {
  const [user, setUser] = React.useState(null);

  let history = useHistory();

  /* create the login callback function for fetching data from Login component */
  const signin = (user = null) => {
    RestaurantDataService.signInUser(user)
      .then((res) => {
        setUser(res.data?.isUserResponse);
        localStorage.setItem("profile", JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    history.push("/restaurants");
  };

  const googleSuccess = (googleResponse = null) => {
    const user = {
      name: `${googleResponse.firstName} ${googleResponse.lastName}`,
      _id: googleResponse.googleId,
      email: googleResponse.email
    };
    setUser(user);
    console.log("user");
    console.log(user);
    history.push("/restaurants");
  };

  const signup = (user = null) => {
    RestaurantDataService.signUpUser(user)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("profile", JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    history.push("/restaurants");
  };

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
              <div>
                <button
                  className="nav-link"
                  onClick={logout}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  {user?.name} Logout
                </button>
              </div>
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
            render={(props) => (
              <Login
                {...props}
                signin={signin}
                signup={signup}
                googleSuccess={googleSuccess}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
