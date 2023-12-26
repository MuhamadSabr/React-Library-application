import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Navbar} from './layouts/Navbar';
import {Footer} from './layouts/Footer';
import {HomePage} from './layouts/home-page/HomePage';
import { SearchBooksPage } from './layouts/search-books/SearchBooksPage';
import { BookCheckoutPage } from './layouts/checkout-books/BookCheckoutPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />

      <div className='flex-grow-1'>
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/search' element={<SearchBooksPage/>}></Route>
          <Route path='/checkout/:bookId' element={<BookCheckoutPage/>}></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

