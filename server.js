app.get('/api/secure', (req, res) => {
  const userHeader = req.headers['x-ms-client-principal'];

  if (!userHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = JSON.parse(
    Buffer.from(userHeader, 'base64').toString('utf8')
  );

  res.json({
    message: "User is authenticated ✅",
    user: user.userDetails
  });
});
