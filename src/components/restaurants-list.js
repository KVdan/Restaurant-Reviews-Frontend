import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  /* search query variables */
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisines] = useState("");

  /* do something after rendering */
  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  /* search box value change handler */
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisines(searchCuisine);
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((res) => {
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisine()
      .then((res) => {
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((res) => {
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row pb-1 align-items-center">
        <div className="input-group col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zipcode"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-md-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine, index) => {
              return (
                <option value={cuisine} key={index}>
                  {cuisine.substr(0, 20)}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="card-columns">
        {restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="cardtitle">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>

                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
