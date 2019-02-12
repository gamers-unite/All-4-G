import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import router from "./router";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {router}
                    <Login />
                    <Profile />
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
