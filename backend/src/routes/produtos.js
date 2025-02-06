import express from "express";
import { addProduct, deleteProduct, getProducts, uploadImage, updateQuantidade, getProductById, updateProduct} from "../controllers/productsController.js"

const router = express.Router();

router.post("/addProduct", uploadImage, addProduct)
router.get("/getProduct", getProducts)
router.get("/produto/:id", getProductById)
router.put("/updateQuantidade/:id", updateQuantidade)
router.put("/updateProduct/:id", updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)

export default router;