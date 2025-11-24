const express = require("express");
const router = express.Router();
const productController = require("../_controllers/productController");

router.get("/produtos", productController.list);
router.get("/produtos/:id", productController.get);
router.post("/produtos", productController.create);
router.put("/produtos/:id", productController.update);
router.delete("/produtos/:id", productController.remove);

module.exports = router;
