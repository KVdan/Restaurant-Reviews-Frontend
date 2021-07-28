import http from "../http-common.js";

class RestaurantDataService {
  // get all distinct cuisines
  getCuisines() {
    return http.get(`/cuisines`);
  }

  // get all restaurants
  getAll(filters, page = 0, restaurantsPerPage = 20) {
    let queryFilters;

    queryFilters = Object.entries(filters)
      .map((item) => item.join("="))
      .join("&");
    queryFilters += "&";

    return http.get(
      `?${queryFilters}restaurantsPerPage=${restaurantsPerPage}&page=${page}`
    );
  }
  // sign in user
  signInUser(user) {
    return http.post("/user/signin", user);
  }
  // sign up user
  signUpUser(user) {
    return http.post("/user/signup", user);
  }
  // get restaurant by id
  get(id) {
    return http.get(`/id/${id}`);
  }
  // post review
  createReview(data) {
    return http.post("/review", data);
  }
  // update review
  updateReview(data) {
    return http.put("/review", data);
  }
  // delete review
  deleteReview(id, userId) {
    return http.delete(`/review/?id=${id}`, { data: { user_id: userId } });
  }
}

export default new RestaurantDataService();
