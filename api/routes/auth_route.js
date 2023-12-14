import express from 'express';
import { signout, signup } from '../controllers/auth_controller.js';
import { signin } from '../controllers/auth_controller.js';
import { google } from '../controllers/auth_controller.js';
// import { test } from '../controllers/user_controller.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout',signout)

export default router;