const express = require('express');
const app = express();

app.use(express.json());

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
    timestamp: new Date().toISOString()
  });
});

// ✅ Roles endpoint for SWA Custom Auth
// SWA custom role assignment should call this so it can get back a roles list.
app.post('/api/getRolesForUsers', (req, res) => {
  try {
    const user = req.body;

    if (!user) {
      return res.json({ roles: [] });
    }

    // Minimal working model:
    // any authenticated user gets the 'authenticated' role
    return res.json({ roles: ['authenticated'] });
  } catch (err) {
    console.error('Role assignment error:', err);
    return res.status(500).json({
      roles: [],
      error: 'Unable to assign roles'
    });
  }
});

// Optional GET handler so you can browse to it manually and see something useful
app.get('/api/getRolesForUsers', (req, res) => {
  res.json({
    message: "Roles endpoint is live. SWA will call this endpoint during sign-in using POST."
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
