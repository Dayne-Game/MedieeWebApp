import express from "express";
const router = express.Router();

import {
  resetUserPassword,
  sendPasswordReset,
} from "../controllers/passwordResetController.js";

router.post("/", sendPasswordReset);
router.post("/:userId/:token", resetUserPassword);

export default router;
