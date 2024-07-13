import express, { type Application } from "express";
import router from "./routes";
import { NotFound } from "./middleware/ErrorHandler";
import cors from "cors";

const app: Application = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cors());

app.use("/api/v1", router);

app.use("*", NotFound);

const PORT: number | string = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
