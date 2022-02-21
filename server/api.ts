import express from "express";

import user from "./api/user";
import post from "./api/post";

const routes = express.Router();

routes.use("/api/user", user);
routes.use("/api/post", post);

export default routes;
