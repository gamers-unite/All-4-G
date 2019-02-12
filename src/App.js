import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import router from "./router";
import Nav from "./components/Navbar";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Nav />
                    {router}
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
