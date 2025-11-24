const express = require("express");
const router = express.Router();
const productController = require("../_controllers/productController");

router.get("/all", productController.list);
router.get("/:id", productController.get);
router.get("/", productController.listActive);
router.put("/:id", productController.update);
router.patch("/excluir/:id", productController.deactivate);

module.exports = router;
