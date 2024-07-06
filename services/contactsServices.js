import fs from "fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

export async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = data.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return deletedContact;
}

export async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };

  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
}

export async function updateContactById(id, updates) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...updates };
  contacts[index] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}
