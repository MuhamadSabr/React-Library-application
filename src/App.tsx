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
import {ManageLibraryPage} from './layouts/manage-library-page/ManageLibraryPage';
import { getRole } from './layouts/utils/Authenticated';
import { PaymentPage } from './layouts/payment-page/PaymentPage';
import { Singup } from './layouts/authentication/Signup';



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

  const PrivateRoute3 = () => {
    const {isAuthenticated} = useAuth();
    if(isAuthenticated){
      return getRole()==='ROLE_ADMIN' ? <ManageLibraryPage /> : <Navigate to={`/${sessionStorage.getItem("redirectPath")}`} />;
    }
    return <Navigate to="/login" />;
  }

  const PrivateRoute4 = () => {
    const {isAuthenticated} = useAuth();
    !isAuthenticated ? sessionStorage.setItem("redirectPath", "/PaymentPage") : sessionStorage.getItem("/redirectPath");
    return isAuthenticated ? <PaymentPage /> : <Navigate to="/PaymentPage" />;
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
            <Route path='/signup' element={<Singup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/shelfPage' element={<PrivateRoute/>}></Route>
            <Route path='/messagePage' element={<PrivateRoute2/>}></Route>
            <Route path='/ManageLibraryPage' element={<PrivateRoute3/>}></Route>
            <Route path='/PaymentPage' element={<PrivateRoute4/>}></Route>
            <Route path='/Logout' element={<Logout/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </div>
        <Footer />
        </AuthProvider>
    </div>
  );
}
