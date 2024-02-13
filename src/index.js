import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QueryPage from './QueryPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivozPage from './pages/PrivozPage';
// import Wholesale from './pages/Wholesale';
// import EventCards from './pages/EventCards';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://privoz.lavron.dev/graphql/',
  //   uri: 'https://cors-anywhere.herokuapp.com/https://privoz.lavron.dev/graphql/',
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivozPage />} />
        <Route path="/querypage" element={<QueryPage />} />
        {/* <Route path="/wholesale" element={<Wholesale />} />
      <Route path="/eventcards" element={<EventCards />} /> */}
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider >
);

reportWebVitals();