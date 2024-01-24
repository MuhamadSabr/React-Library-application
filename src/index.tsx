import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {App} from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const stripePromise = loadStripe("pk_test_51ObLVwByFXIe4EGlx4KNEkLrbsQZ5ThuKwnTZ2uvoWLoBAdyJNnxlBx4jHRDBvDcfprP8Uo48SRND3I78S3P0wuN00ign1CKxO");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
  </BrowserRouter>
);
