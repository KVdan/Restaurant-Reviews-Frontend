import React, { useState, useEffect, useCallback } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const RestaurantsList = (props) => {
  /* data source */
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  /* search query variables */
  const [searchName, setSearchName] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [filters, setFilters] = useState({ name: "", cuisine: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(4);
  const [pagesCount, setPagesCount] = useState(0);

  /* do something after rendering */
  useEffect(() => {
    retrieveCuisines();
    retrieveRestaurants();
  }, []);

  const pageArr = Array.from(Array(pagesCount).keys());
  /* search box value change handler */
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
    setFilters({ name: searchName, cuisine: searchCuisine });
  };

  const onChangeSearchCuisine = (e, value) => {
    const searchCuisine = value;
    setSearchCuisine(searchCuisine);
    setFilters({ name: searchName, cuisine: searchCuisine });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll(filters, currentPage, restaurantsPerPage)
      .then((res) => {
        setRestaurants(res.data.restaurants);
        setTotalResults(res.data.total_results);
        setPagesCount(Math.ceil(res.data.total_results / restaurantsPerPage));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = useCallback(() => {
    RestaurantDataService.getCuisines()
      .then((res) => {
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleCuisineSearchKeydown = (event) => {
    if (event.key === "Enter") {
      refreshList();
    }
  };

  const jumpToPage = (event) => {
    setCurrentPage(parseInt(event.target.innerHTML, 10));
    refreshList();
  };

  const jumpToPage0 = (event) => {
    setCurrentPage(0);
    refreshList();
  };

  const jumpToNextPage = (event) => {
    setCurrentPage(currentPage + 1);
    refreshList();
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

  return (
    <div>
      <div>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="combo-box-demo"
                value={searchCuisine}
                onChange={onChangeSearchCuisine}
                onKeyPress={handleCuisineSearchKeydown}
                options={cuisines.map((cuisine) => cuisine.substr(0, 20))}
                getOptionLabel={(option) => option}
                style={{ width: 210 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by Cuisine + Enter" />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Search by Name"
                value={searchName}
                style={{ width: 170 }}
                onChange={onChangeSearchName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={refreshList}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </div>

      <div>
        <div className="d-flex flex-row-reverse bd-highlight">
          <span className="p-2 bd-highlight">
            Total Results: {totalResults}
          </span>
          <span className="p-2 bd-highlight">Page: {currentPage} </span>
          <span className="p-2 bd-highlight">
            Restaurants/Page: {restaurantsPerPage}
          </span>
        </div>
        <Container maxWidth="md">
          <p>Jump to page</p>
          <div
            className="d-flex flex-row bd-highlight mb-3"
            style={{ height: 40 }}
          >
            <button class="h-100 d-inline-block" onClick={jumpToPage0}>
              Zero
            </button>

            {restaurants ? (
              currentPage < 3 ? (
                pageArr.slice(1, 5).map((item, index) => (
                  <button
                    key={index}
                    class="h-100 d-inline-block"
                    onClick={jumpToPage}
                  >
                    {pageArr.indexOf(item)}
                  </button>
                ))
              ) : (
                pageArr
                  .slice(currentPage - 2, currentPage + 3)
                  .map((item, index) => (
                    <button
                      key={index}
                      class="h-100 d-inline-block"
                      onClick={jumpToPage}
                    >
                      {pageArr.indexOf(item)}
                    </button>
                  ))
              )
            ) : (
              <span></span>
            )}
            {currentPage + 3 < [...pageArr].pop() ? (
              <div>
                <button class="h-100 d-inline-block" disabled>
                  ...
                </button>
                <button class="h-100 d-inline-block" onClick={jumpToPage}>
                  {pageArr.indexOf([...pageArr].pop())}
                </button>
              </div>
            ) : (
              <span></span>
            )}

            <button onClick={jumpToNextPage}>Next</button>
          </div>
        </Container>
      </div>

      <div>
        <Container maxWidth="sm">
          <Grid container spacing={4}>
            {restaurants.map((restaurant, index) => {
              const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
              return (
                <Grid item key={index} xs={12} sm={6}>
                  <Item>
                    <h5 className="cardtitle">{restaurant.name}</h5>
                    <p className="card-text">
                      <strong>Cuisine: </strong>
                      {restaurant.cuisine}
                      <br />
                      {address}
                    </p>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm">
                          <Link to={"/restaurants/" + restaurant._id}>
                            <Button>View Reviews</Button>
                          </Link>
                        </div>
                        <div className="col-sm">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={
                              "https://www.google.com/maps/place/" + address
                            }
                          >
                            <Button>View Map</Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Container maxWidth="sm">
          <Grid container spacing={4}>
            {}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default RestaurantsList;
