import express from "express";

import user from "./api/user";

const routes = express.Router();

routes.use("/api/user", user);

export default routes;
