import express from "express";
import ContactController from "../controllers/contactsControllers.js";

import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();
contactsRouter.get("/", ContactController.getAllContacts);
contactsRouter.get("/:id", ContactController.getOneContact);
contactsRouter.delete("/:id", ContactController.deleteContact);
contactsRouter.post("/", validateBody(createContactSchema), ContactController.createContact);
contactsRouter.put("/:id", validateBody(updateContactSchema), ContactController.updateContact);

export default contactsRouter;
