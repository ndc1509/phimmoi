const routes = {
    //Client route
    home: "/",
    tvSeries: "/tv-series",
    movies: "/movies",
    myList: "/my-list",
    latest: "/latest",
    details: "/details/:title",
    watchTVSeries: "/watch/:movieId/:ssId/:epId",
    watchMovie: "/watch/:movieId",
    searchResults: "/search/:query",
    login: "/login",
    register: "/register",
    //Admin route
    admin: "/admin",
    peopleList: "/admin/people",
    genresList: "/admin/genres",
    userList: "/admin/user",
    moviesList: "/admin/movies",
}

export default routes