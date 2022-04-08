import ContactModel from "../model/contact.model";
import { IContact } from "../model/types";

export function createContactService(contactData: IContact) {
  return ContactModel.create(contactData);
}

export function getContactsService(id: string) {
  return ContactModel.find({ userId: id });
}

export function deleteContactService(id: string) {
  return ContactModel.findByIdAndDelete(id);
}

export function updateContactService(id: string, data: Omit<IContact, 'userId'>) {
  return ContactModel.findByIdAndUpdate(id, data);
}