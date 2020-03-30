import React, {Suspense, useState} from "react";
import SideNav from "../../SideNav";
import { Container, Content } from "rsuite";
import { Switch, Route } from "react-router-dom";
import routes from "../../../routes";

function Loading() {
    return (
        <div className="animated fadeIn pt-3 text-center">Loading...</div>
    );
}

export default function DefaultLayout() {
    const [expand, setExpand] = useState(true);

    function handleToggle() {
        setExpand(!expand);
    }

    return (
        <Container>
            <SideNav expand={expand} handleToggle={handleToggle} />
            <Container className={(expand)? "page-container" : "page-container container-full"}>
                <Content>
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            {routes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        component={route.component}
                                        name={route.name}
                                        exact={route.exact}
                                    />
                                );
                            })}
                        </Switch>
                    </Suspense>
                </Content>
            </Container>
        </Container>
    );
}