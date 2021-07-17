import http from "../http-common";

class RestaurantDataService {
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

  get(id) {
    return http.get(`/id/${id}`);
  }

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review/?id=${id}`, { data: { user_id: userId } });
  }

  getCuisines() {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();
