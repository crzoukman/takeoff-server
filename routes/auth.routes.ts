import { Router } from "express";
import { createUserController, loginController, refreshAccessTokenController } from "../controller/auth.controller";

const router = Router();

router.post(
  '/api/login',
  loginController,
);

router.post(
  '/api/registration',
  createUserController,
);

router.post(
  '/api/login',
  loginController,
);

router.get(
  '/api/refresh',
  refreshAccessTokenController,
)

export default router;