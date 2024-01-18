import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Navbar} from './layouts/Navbar';
import {Footer} from './layouts/Footer';
import {HomePage} from './layouts/home-page/HomePage';
import { SearchBooksPage } from './layouts/search-books/SearchBooksPage';
import { BookCheckoutPage } from './layouts/checkout-books/BookCheckoutPage';
import { Login } from './layouts/authentication/Login';
import { PageNotFound } from './layouts/exceptions/PageNotFound';
import { Logout } from './layouts/authentication/Logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ShelfPage } from './layouts/shelf-page/ShelfPage';
import { MessagePage } from './layouts/messgae-page/MessagePage';



export const App = () => {
 
  const PrivateRoute = () => {
    const {isAuthenticated} = useAuth();
    !isAuthenticated ? sessionStorage.setItem("redirectPath", "/ShelfPage") : sessionStorage.getItem("/redirectPath");
    return isAuthenticated ? <ShelfPage /> : <Navigate to="/login" />;
  }

  const PrivateRoute2 = () => {
    const {isAuthenticated} = useAuth();
    !isAuthenticated ? sessionStorage.setItem("redirectPath", "/MessagePage") : sessionStorage.getItem("/redirectPath");
    return isAuthenticated ? <MessagePage /> : <Navigate to="/login" />;
  }


  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route index element={<HomePage/>}></Route>
            <Route path='/home' element={<HomePage/>}></Route>
            <Route path='/search' element={<SearchBooksPage/>}></Route>
            <Route path='/checkout/:bookId' element={<BookCheckoutPage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/shelfPage' element={<PrivateRoute/>}></Route>
            <Route path='/messagePage' element={<PrivateRoute2/>}></Route>
            <Route path='/Logout' element={<Logout/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </div>
        <Footer />
        </AuthProvider>
    </div>
  );
}
