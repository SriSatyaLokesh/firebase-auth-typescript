import express from 'express';
const router = express.Router();

import {signup, signin, forgotPassword, sendMailVerification } from "../controllers/auth.js"

router.post('/signup', signup);
router.post('/forgotPassword', forgotPassword);
router.post('/sendEmailVerification', sendMailVerification);
router.post('/signin', signin);

export { router };