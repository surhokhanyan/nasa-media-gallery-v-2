import React from "react";
import { Route, Routes } from "react-router-dom";
import { constants } from "../assets/constants";
import Search from "../components/Search";
import Show from "../components/Show";
import { RouteTypes } from "../types";

const { paths } = constants;

const appRoutes: RouteTypes[] = [
    { id: paths.search, path: paths.search, element: <Search /> },
    { id: paths.show, path: paths.show, element: <Show /> },
    { id: "other", path: "*", element: <Search /> },
];

const AppRoutes = () => {
    return (
        <Routes>
            {appRoutes.map(({ id, path, element }) => (
                <Route key={id} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRoutes;
