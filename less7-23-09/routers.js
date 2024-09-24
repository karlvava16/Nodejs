import { Router } from "express";
const router = Router();

// router.route('/')
//     .get()
//     .post()
//     .delete()

router.get("/", (req, res) => {
  res.send("Home Page /");
});

router.get("/products", (req, res) => {
  res.send("Products Page /");
});

export default router;
