const express = require("express");
const router = express.Router();
const productController = require("../_controllers/productController");

router.get("/", productController.list);
router.get("/:id", productController.get);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;
