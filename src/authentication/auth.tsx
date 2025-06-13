
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { Fragment } from "react";
import store from "../store/index";

const Auth = () => {

    return (
        <Fragment>
            <Provider store={store}>
                <Outlet />
            </Provider>
        </Fragment>
    );
};

export default Auth;
