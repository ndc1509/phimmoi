import config from "../config";
//Layouts
import MainLayout, { LayoutProps } from "../components/layouts/MainLayout";

//Pages
import React from "react";
import LoginLayout from "../components/layouts/LoginLayout";
import Register from "../components/Register";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Home from "../pages/Home";
import MyList from "../pages/MyList";
//Admin
import AdminHome from "../pages/Admin/Home";
import PeoplePage from "../pages/Admin/People";
import SecondaryLayout from "../components/layouts/SecondaryLayout";    
import MoviesPage from "../pages/Movies";
import TVSeriesPage from "../pages/TVSeries";
import SearchResultsPage from "../pages/SearchResults";
import MyListPage from "../pages/MyList";
import WatchPage from "../pages/Watch";
import AdminLayout from "../components/layouts/AdminLayout";
import AdminMovies from "../pages/Admin/Movies";
interface Route {
    path: string;
    component: React.FunctionComponent;
    layout: React.FunctionComponent<LayoutProps> | null;
}

export const publicRoutes: Array<Route> = [
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
        layout: SecondaryLayout
    }, {
        path: config.routes.tvSeries,
        component: TVSeriesPage,
        layout: SecondaryLayout
    }, {
        path: config.routes.searchResults,
        component: SearchResultsPage,
        layout: MainLayout
    }, {
        path: config.routes.myList,
        component: MyListPage,
        layout: SecondaryLayout
    },
   
    {
        path: config.routes.admin,
        component: AdminHome,
        layout: AdminLayout,
    },
    {
        path: config.routes.moviesList,
        component: AdminMovies,
        layout: AdminLayout
    },
    {
        path: config.routes.peopleList,
        component: PeoplePage,
        layout: AdminLayout
    }
];

export const privateRoutes: Array<Route> = [
     //ADMIN PAGES
     
    // {
    //     path: config.routes.userList,
    //     component: 
    // },
   
];
