import express from "express";
import { addProduct, deleteProduct, getProducts } from "../controllers/productsController.js"

const router = express.Router();

router.post("/addProduct", addProduct)
router.get("/getProduct", getProducts)
router.delete("/deleteProduct/:id", deleteProduct)

export default router;