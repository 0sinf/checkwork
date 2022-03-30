import express, { Request, Response, NextFunction } from "express";
import { createConnection } from "typeorm";

import config from "./config";
import route from "./routes";

const app = express();
const port = config.port || 3000;

createConnection()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

app.use((req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(403).json({ msg: err.message });
  next();
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Start app at ${port}`);
  });
}

export default app;
