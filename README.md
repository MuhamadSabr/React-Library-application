# General functionalities
Communicates with the backend server to fetch, post, or update data.
Implements JWT authentication in sync with the backend server. Sends a request to /login and receives a token back which stores in session storage and is used in subsequent requests to the server. Refreshes the Token in case the token is still valid but has only 10 minutes left to expire.
Uses React Router to establish navigation between pages.
It uses Bootstrap to style every page and component.
Uses self-signed certificate to enable HTTPS communication with the backend server and be able to process payment.
Uses stripe to accept payment from customers, in case they have late-fees to be paid which they will be charged in case of late books.

# Visit http://library-front-end.s3-website.eu-north-1.amazonaws.com/
to see the app
