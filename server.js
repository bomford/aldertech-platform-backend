const express = require('express');
const app = express();

// ✅ Root API endpoint (fixes “Cannot GET /api/”)
app.get('/api/', (req, res) => {
  res.json({
    message: "API root working ✅",
    availableEndpoints: [
      "/api/test"
    ]
  });
});

// ✅ Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: "API is working ✅",
    timestamp: new Date(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
