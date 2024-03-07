import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "./redux/App/Store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// for google auth inorder to login with gmail
// import { GoogleOAuthProvider } from '@react-oauth/google' ..... forjob portal
// root.render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId="684088104156-ml5q0cn9ec4dfcuc3o67hlio2m1blht6.apps.googleusercontent.com">
//     <App />
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );
