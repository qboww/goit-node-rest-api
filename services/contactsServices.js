import fs from "fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((item) => item.id === contactId) || null;
};

export const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [deletedContact] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

export const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

export const updateContactById = async (id, updates) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const updatedContact = { ...data[index], ...updates };
  data[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return updatedContact;
};
