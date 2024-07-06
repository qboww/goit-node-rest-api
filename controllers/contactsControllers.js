import ContactService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { asyncHandler } from "../helpers/controllersHandler.js";

class ContactController {
  static async getAllContacts(req, res) {
    const contacts = await ContactService.listContacts();
    res.status(200).json(contacts);
  }

  static async getOneContact(req, res, next) {
    const contact = await ContactService.getContactById(req.params.id);
    if (!contact) {
      return next(HttpError(404, "Contact not found!"));
    }
    res.status(200).json(contact);
  }

  static async deleteContact(req, res, next) {
    const deletedContact = await ContactService.removeContact(req.params.id);
    if (!deletedContact) {
      return next(HttpError(404, "Contact not found!"));
    }
    res.status(200).json(deletedContact);
  }

  static async createContact(req, res) {
    const { name, email, phone } = req.body;
    const newContact = await ContactService.addContact(name, email, phone);
    res.status(201).json(newContact);
  }

  static async updateContact(req, res, next) {
    const { id } = req.params;
    const updates = req.body;
    const updatedContact = await ContactService.updateContactById(id, updates);
    if (!updatedContact) {
      return next(HttpError(404, "Contact not found!"));
    }
    res.status(200).json(updatedContact);
  }
}

export default ContactController;
