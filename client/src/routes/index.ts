import React from "react";
import config from "../config";
//Layouts
import LoginLayout from "@components/layouts/LoginLayout";
import MainLayout, { LayoutProps } from "@components/layouts/MainLayout";
import SecondaryLayout from "@components/layouts/SecondaryLayout";

//Pages
//Client
import Register from "@components/Register";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MoviesPage from "../pages/Movies";
import MyListPage from "../pages/MyList";
import SearchResultsPage from "../pages/SearchResults";
import TVSeriesPage from "../pages/TVSeries";
import WatchPage from "../pages/Watch";
//Admin
import AdminLayout from "@components/layouts/AdminLayout";
import AdminPeoplePage from "../pages/Admin/People";
import AdminUserPage from "../pages/Admin/Users";
import AdminGenresPage from "../pages/Admin/Genres";
import AdminHomePage from "../pages/Admin/Home";
import AdminMoviesPage from "../pages/Admin/Movies";
//Error
import Error403Page from "../pages/Error/403";
import Error404Page from "../pages/Error/404";

interface Route {
    path: string;
    component: React.FunctionComponent;
    layout: React.FunctionComponent<LayoutProps> | null;
}

export const publicRoutes: Array<Route> = [
    //PUBLIC PAGES
    { path: config.routes.login, component: Login, layout: LoginLayout },
    { path: config.routes.register, component: Register, layout: LoginLayout },
    {
        path: config.routes.details,
        component: Details,
        layout: MainLayout,
    },
    {
        path: config.routes.watchTVSeries,
        component: WatchPage,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.watchMovie,
        component: WatchPage,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routes.movies,
        component: MoviesPage,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.tvSeries,
        component: TVSeriesPage,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.searchResults,
        component: SearchResultsPage,
        layout: MainLayout,
    },
    {
        path: config.routes.myList,
        component: MyListPage,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.unauthorized,
        component: Error403Page,
        layout: null,
    },
    {
        path: config.routes.notFound,
        component: Error404Page,
        layout: null,
    },
];

export const privateRoutes: Array<Route> = [
    //ADMIN PAGES
    {
        path: config.routes.admin,
        component: AdminHomePage,
        layout: AdminLayout,
    },
    {
        path: config.routes.moviesList,
        component: AdminMoviesPage,
        layout: AdminLayout,
    },
    {
        path: config.routes.genresList,
        component: AdminGenresPage,
        layout: AdminLayout,
    },
    {
        path: config.routes.peopleList,
        component: AdminPeoplePage,
        layout: AdminLayout,
    },
    {
        path: config.routes.userList,
        component: AdminUserPage,
        layout: AdminLayout,
    },
];
