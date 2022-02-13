import express, { Request, Response } from "express";
import next from "next";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import api from "./api";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fleekshot.pyldb.mongodb.net/Fleekshot?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      throw err;
    }
  }
);

(async () => {
  try {
    await app.prepare();

    const server = express();

    server.use(bodyParser.json());

    server.use(api);

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
