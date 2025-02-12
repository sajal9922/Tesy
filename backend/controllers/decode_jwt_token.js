const jwt = require('jsonwebtoken');

// Sample JWT token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMTIzIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNzE1MDgwMDYwLCJleHAiOjE3MTUwODAxMjB9.3aVoiiqNkOM4wuvVTlQVaqBS9L22VVuvJjM0W0AyuMU';

// Secret key used to sign the token
const secretKey = 'ACCESS_TOKEN_SECRET';

// Decode the JWT token
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        // Token verification failed
        console.error('JWT verification failed:', err.message);
    } else {
        // Token verification succeeded
        console.log('Decoded token:', decoded);
        // You can access the decoded payload properties here
        console.log('Username:', decoded.username);
        // Access other properties as needed
    }
});
