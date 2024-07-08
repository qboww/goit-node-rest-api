import * as contactService from "../services/contactsService.js";
import handleAsync from "../helpers/handleAsync.js";
import respond from "../helpers/responseWrapper.js";

export const getAllContacts = handleAsync(async (req, res) => {
  const listedContacts = await contactService.getAllContacts();
  if (!listedContacts) {
    return respond(res, 404, "Contacts not found");
  }
  respond(res, 200, "success", { contacts: listedContacts });
});

export const getOneContact = handleAsync(async (req, res) => {
  const { id } = req.params;
  const foundContact = await contactService.getOneContact(id);
  if (!foundContact) {
    return respond(res, 404, "Contact not found");
  }
  respond(res, 200, "success", { contact: foundContact });
});

export const deleteContact = handleAsync(async (req, res) => {
  const { id } = req.params;
  const removedContact = await contactService.deleteContact(id);
  if (!removedContact) {
    return respond(res, 404, "Contact not found");
  }
  respond(res, 200, "success", { contact: removedContact });
});

export const createContact = handleAsync(async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const createdContact = await contactService.createContact({ name, email, phone, favorite });
  respond(res, 201, "success", { contact: createdContact });
});

export const updateContact = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedContact = await contactService.updateContact(id, updates);
  if (!updatedContact) {
    return respond(res, 404, "Contact not found");
  }
  respond(res, 201, "success", { contact: updatedContact });
});

export const updateStatusContact = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (typeof favorite !== "boolean") {
    return respond(res, 400, "Field must have a boolean value");
  }
  const updatedContact = await contactService.patchContact(id, favorite);
  if (!updatedContact) {
    return respond(res, 404, "Contact not found");
  }
  respond(res, 201, "success", { contact: updatedContact });
});
