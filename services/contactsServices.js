import fs from "fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

class ContactService {
  static contactsPath = path.join(process.cwd(), "db", "contacts.json");

  static async listContacts() {
    const data = await fs.readFile(ContactService.contactsPath, "utf-8");
    return JSON.parse(data);
  }

  static async getContactById(contactId) {
    const data = await ContactService.listContacts();
    return data.find((item) => item.id === contactId) || null;
  }

  static async removeContact(contactId) {
    const data = await ContactService.listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const [deletedContact] = data.splice(index, 1);
    await fs.writeFile(
      ContactService.contactsPath,
      JSON.stringify(data, null, 2)
    );
    return deletedContact;
  }

  static async addContact(name, email, phone) {
    const data = await ContactService.listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(
      ContactService.contactsPath,
      JSON.stringify(data, null, 2)
    );
    return newContact;
  }

  static async updateContactById(id, updates) {
    const data = await ContactService.listContacts();
    const index = data.findIndex((contact) => contact.id === id);
    if (index === -1) return null;
    const updatedContact = { ...data[index], ...updates };
    data[index] = updatedContact;
    await fs.writeFile(
      ContactService.contactsPath,
      JSON.stringify(data, null, 2)
    );
    return updatedContact;
  }
}

export default ContactService;
