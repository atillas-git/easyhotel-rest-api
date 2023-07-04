import express, { Router } from "express";
import { authorize } from "../middlewares/authorize";
import { checkUserAuthentication, login, register } from "../controllers/auth";

const router: Router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/checkUserAuthentication", authorize, checkUserAuthentication);

export default router;
