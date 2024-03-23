const express = require('express');
import('node-fetch').then(({ default: fetch }) => {

    const express = require('express');
    const app = express();

    app.use(express.json());

    // Define your frontend and backend endpoints
    const frontendURL = 'http://localhost:5173'; // Change this to your frontend URL
    const backendURL = 'http://localhost:8000'; // Change this to your backend URL

    app.all('/api/*', async (req, res) => {
        try {
            // Log the cookies received from the frontend
            console.log('Cookies from frontend:', req.headers.cookie);
            console.log('dddd')

            // Forward the request to the backend server
            const response = await fetch(backendURL + req.url, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers or cookies from the frontend request
                    // In this example, we're forwarding all headers and cookies
                    ...req.headers
                },
                body: JSON.stringify(req.body)
            });
            
            // Forward the backend response back to the frontend
            res.status(response.status);
            for (const [key, value] of response.headers.entries()) {
                res.setHeader(key, value);
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            // console.error('Proxy error:', error);
            // res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Serve frontend assets (if necessary)
    app.use(express.static('public'));

    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Proxy server listening on port ${PORT}`);
    });
}).catch(error => {
    // console.error('Error loading node-fetch:', error);
});