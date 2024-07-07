import HttpError from "../helpers/HttpError.js";
import controllerHandler from "../helpers/controllersHandler.js";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = controllerHandler(async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

export const getOneContact = controllerHandler(async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    return next(HttpError(404, "Contact not found!"));
  }
  res.status(200).json(contact);
});

export const deleteContact = controllerHandler(async (req, res, next) => {
  const deletedContact = await removeContact(req.params.id);
  if (!deletedContact) {
    return next(HttpError(404, "Contact not found!"));
  }
  res.status(200).json(deletedContact);
});

export const createContact = controllerHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

export const updateContact = controllerHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedContact = await updateContactById(id, updates);
  if (!updatedContact) {
    return next(HttpError(404, "Contact not found!"));
  }
  res.status(200).json(updatedContact);
});
