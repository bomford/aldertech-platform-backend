const express = require('express');
const app = express();

// ✅ Root endpoint (important for Azure health check)
app.get('/', (req, res) => {
  res.send('API root OK ✅');
});

// ✅ API root
app.get('/api/', (req, res) => {
  res.json({
    message: "API root working ✅",
    availableEndpoints: ["/api/test"]
  });
});

// ✅ Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: "API is working ✅",
    timestamp: new Date()
  });
});

// ✅ Optional secure example
app.get('/api/secure', (req, res) => {
  const header = req.headers['x-ms-client-principal'];

  if (!header) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = JSON.parse(
    Buffer.from(header, 'base64').toString('utf8')
  );

  return res.json({
    message: "Secure endpoint ✅",
    user: user.userDetails
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
