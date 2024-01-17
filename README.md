# General functionalities
Communicates with the backend server to fetch data, post or update data.
Implements JWT authentication in sync with the backend server. Sends a request to /login and receives a token back which stores in session storage and is used in subsequent requests to the server. Refreshes the Token in case the token is still valid but has only 10 minutes left to expire.
Uses React Router to establish navigation between pages.
Uses Bootstrap to style every page and component.


#Tasks expected to be completed in next week
Library Service which users can leave messages for administrators to answer.