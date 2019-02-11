import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store'
import router from './router';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {router}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
