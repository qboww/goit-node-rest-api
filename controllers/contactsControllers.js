import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import HttpError from "../helpers/HttpError.js";
import { validateBody } from "../helpers/validateBody.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      return next(HttpError(404, "Contact not found"));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.id);
    if (!deletedContact) {
      return next(HttpError(404, "Contact not found"));
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return next(HttpError(400, error.message));
    }

    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    validateBody(updateContactSchema)(req, res, () => {});

    const updatedContact = await updateContactById(id, updates);

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
