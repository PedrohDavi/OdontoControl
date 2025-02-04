import express from "express";
import { addProduct, deleteProduct, getProducts, uploadImage, updateQuantidade} from "../controllers/productsController.js"

const router = express.Router();

router.post("/addProduct", uploadImage, addProduct)
router.get("/getProduct", getProducts)
router.delete("/deleteProduct/:id", deleteProduct)
router.put("/updateProduct/:id", updateQuantidade)

export default router;