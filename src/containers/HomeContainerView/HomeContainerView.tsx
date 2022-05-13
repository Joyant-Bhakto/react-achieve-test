import React from "react";
import Notfound from "@src/pages/NotFound";
import { Route, Switch } from "react-router-dom";

import FilmListPage from "@pages/FilmListPage"
import DashboardPage from "@pages/DashboardPage"
import StaffListPage from "@pages/StaffListPage"
import PrivateLayout from "@layouts/PrivateLayout";
import CustomerListPage from "@pages/CustomerListPage"

const HomeContainerView: React.FC = () => {
    return (
        <PrivateLayout>
            <Switch>
                <Route path={"/dashboard"}>
                    <DashboardPage />
                </Route>

                <Route path={"/films"}>
                    <FilmListPage />
                </Route>

                <Route path={"/staves"}>
                    <StaffListPage />
                </Route>

                <Route path={"/customers"}>
                    <CustomerListPage />
                </Route>

                <Route>
                    <Notfound />
                </Route>
            </Switch>
        </PrivateLayout>
    );
};

export default HomeContainerView;
