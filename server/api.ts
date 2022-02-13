import express from "express";

import user from "./user";

const routes = express.Router();

routes.use("/api/user", user);

export default routes;
