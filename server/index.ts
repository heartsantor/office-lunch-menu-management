import app from "./app";
import dotenv from "dotenv";
const cors = require("cors");

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
