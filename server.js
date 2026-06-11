const express = require('express');
const app = express();

// ✅ Root API endpoint
app.get('/api/', (req, res) => {
  res.json({
    message: "API root working ✅",
    availableEndpoints: [
      "/api/test",
      "/api/getRolesForUsers"
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

// ✅ ✅ CRITICAL: Roles endpoint for SWA Custom Auth
app.get('/api/getRolesForUsers', (req, res) => {
  const userHeader = req.headers['x-ms-client-principal'];

  // ❌ No user → no roles
  if (!userHeader) {
    return res.json({ roles: [] });
  }

  try {
    const decoded = Buffer.from(userHeader, 'base64').toString('utf8');
    const user = JSON.parse(decoded);

    console.log("User from SWA:", user);

    // ✅ Assign all authenticated users
    return res.json({
      roles: ["authenticated"]
    });

  } catch (err) {
    console.error("Error parsing user:", err);

    return res.status(500).json({
      roles: [],
      error: "Failed to parse user identity"
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
