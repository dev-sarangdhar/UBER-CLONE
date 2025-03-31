const http = require('http');
const app = require('./app'); 
const connectToDb = require('./db/db'); // Import database connection
const port = process.env.PORT || 5000; // Change the port to 5000 or use an environment variable

connectToDb().then(() => {
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Trying another port...`);
            server.listen(port + 1);
        } else {
            console.error(err);
        }
    });
}).catch(err => {
    console.error("❌ Failed to start server:", err);
});