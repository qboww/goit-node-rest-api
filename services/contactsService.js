import Contact from "../schemas/contact.js";

export const getAllContacts = async ({ page, limit, favorite }) => {
  const skip = (page - 1) * limit;
  const filter = favorite !== undefined ? { favorite } : {};

  const contacts = await Contact.find(filter).skip(skip).limit(limit);
  return contacts;
};

export const getOneContact = (id) => {
  return Contact.findOne({ _id: id });
};

export const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

export const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate(id, fields, { new: true });
};

export const patchContact = (id, favorite) => {
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

export const deleteContact = (id) => {
  return Contact.findByIdAndDelete(id);
};
