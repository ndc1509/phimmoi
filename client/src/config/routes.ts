const routes = {
    //Client route
    home: "/",
    tvSeries: "/tv-series",
    movies: "/movies",
    myList: "/my-list",
    latest: "/latest",
    details: "/details/:movieId",
    watchTVSeries: "/watch/:movieId/:ssId/:epId",
    watchMovie: "/watch/:movieId",
    searchResults: "/search/:query",
    login: "/login",
    register: "/register",
    //Error
    notFound: "/404",
    unauthorized: "/403",
    //Admin route
    admin: "/admin",
    peopleList: "/admin/people",
    genresList: "/admin/genres",
    userList: "/admin/users",
    moviesList: "/admin/movies",
}

export default routes