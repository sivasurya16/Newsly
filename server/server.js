import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import login from "./routes/auth.js";
import connectDB from "./db/connection.js";

connectDB();
const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/auth", login);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});