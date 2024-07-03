const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propietariosRouter = require('./routes/propietarios');

const app = express();

mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/api/propietarios', propietariosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
