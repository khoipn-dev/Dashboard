import React from "react";

const DashBoard = React.lazy(() => import("./modules/Dashboard"));
const Error404 = React.lazy(() => import("./modules/404"));
const Error500 = React.lazy(() => import("./modules/500"));
const Staffs = React.lazy(() => import("./modules/Staffs"));
const Departments = React.lazy(() => import("./modules/Departments"));

const routes = [
    { path: "/", name: "Dashboard", component: DashBoard  , exact: true },
    { path: "/dashboard", name: "Dashboard", component: DashBoard},
    { path: "/error/404", name: "Not Found", component: Error404 },
    { path: "/error/500", name: "Server Busy", component: Error500 },
    { path: "/staffs", name: "Staffs", component: Staffs },
    { path: "/departments", name: "Departments", component: Departments },
];

export default routes;