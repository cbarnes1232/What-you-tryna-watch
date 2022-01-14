import React from "react";

import { Navbar } from "react-bootstrap";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
// import { Router } from "react-router";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar/searchMovie";
import Login from './pages/Login';
import Signup from './pages/Signup';
import './Components/styles/searchBar.css';
import './Components/styles/movie.css';
import './Components/styles/style.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
        
          <div className="container">
            <Header />
              <Routes>
                <Route path="/" element={<SearchBar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            <Footer />
          </div>
            
        </BrowserRouter>
             
            {/* <Header />
            <div className="container">
            <SearchBar />
            </div>
            <Footer /> */}
            
      </ApolloProvider>
    </>
  );
}
export default App;
