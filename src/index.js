import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
// import store from './redux/store';
import { store } from './redux/store';

import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';

import { QueryClient, QueryClientProvider } from 'react-query';

const toastContainerStyle = {
  width: window.innerWidth > 600 ? "auto" : "100%",
};
const toastContainerPosition = window.innerWidth <= 600 ? "bottom-center" : "top-center";

window.addEventListener("resize", () => {
  toastContainerStyle.width = window.innerWidth > 600 ? "auto" : "100%";
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Provider store={store}>
    

      <ToastContainer
        style={toastContainerStyle}
        bodyClassName="toastBody" 
        position={toastContainerPosition}
        hideProgressBar={true}
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
        transition={Slide}
        />
      <App />

    </Provider>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
