import express from "express";
import * as contactsController from "../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getOneContact);
router.delete("/:id", contactsController.deleteContact);
router.post("/", contactsController.createContact);
router.put("/:id", contactsController.updateContact);
router.patch("/:id/favorite", contactsController.updateStatusContact);

export default router;
