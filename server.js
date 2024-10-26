const express = require("express");
const app = express();
const path = require("path");

let locationData = null;

// Serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint to receive location data (e.g., from the browser's JavaScript)
app.post("/update-location", express.json(), (req, res) => {
    locationData = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        mapLink: `http://www.google.com/maps/@${req.body.latitude},${req.body.longitude},11z`
    };
    console.log("Location updated:", locationData);
    res.status(200).send("Location data received");
});

// Endpoint to get the latest location data
app.get("/location", (req, res) => {
    if (locationData) {
        res.json(locationData);
        // Optionally clear locationData after each retrieval
        locationData = null;
    } else {
        res.status(404).send("Location not available");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
