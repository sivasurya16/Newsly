import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import login from "./routes/auth.js";
import upload from "./routes/upload.js";
import connectDB from "./db/connection.js";

connectDB();
// console.log(await saveFile('bob.txt', 'abcd'));

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/auth", login);
app.use("/upload", upload);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});