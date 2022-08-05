import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LayoutProps } from "./components/layouts/MainLayout";
import useReauthorize from "./hooks/useReauthorize";
import Error404Page from "./pages/Error/404";
import PrivatePage from "./pages/Private";
import { privateRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "./store";
import { authSelector } from "./store/reducers/authSlice";
function App() {
  useReauthorize();
  const authState = useAppSelector(authSelector);
  if (authState.reauthorized)
    return (
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout:
            | React.FunctionComponent<LayoutProps>
            | React.ReactFragment = React.Fragment;
          if (route.layout) {
            Layout = route.layout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout:
            | React.FunctionComponent<LayoutProps>
            | React.ReactFragment = React.Fragment;
          if (route.layout) {
            Layout = route.layout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivatePage>
                  <Layout>
                    <Page />
                  </Layout>
                </PrivatePage>
              }
            />
          );
        })}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    );
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default App;
