import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./i18n";
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';

const DefaultLayout = React.lazy(() => import("./components/layouts/DefaultLayout"));

function Loading() {
    return (
        <div className="animated fadeIn pt-3 text-center">Loading...</div>
    );
}

function App() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" name="Dashboard" component={DefaultLayout} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
