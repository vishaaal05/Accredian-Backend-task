const express = require("express");
const cors = require("cors");
const referralRoutes = require('./routes/referralRoutes');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use('/api/v1', referralRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
