import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession, mpesaPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/mpesa-stk-push", protectRoute, mpesaPayment);


export default router;