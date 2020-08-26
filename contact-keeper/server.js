const express = require('express');

const app = express();

// Mulitple things we can send but we will get doing res.json because we want to use this as an API
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the ContactKeeper API' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Checks if we have an active environment var set for port of our local host. Default is 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
