import { Request, Response } from "express";
import { createContactService, deleteContactService, getContactsService, updateContactService } from './../service/contacts.service';

export async function createContactController(
  req: Request,
  res: Response
) {
  try {
    const contact = await createContactService(req.body);

    return res.send('A new contact has been added!');
  } catch (e) {
    return res.sendStatus(500);
  }

}

export async function getContactsController(
  req: Request,
  res: Response
) {
  try {
    const id = req.query.id as string;
    const contacts = await getContactsService(id);

    return res.send(contacts);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function deleteContactController(
  req: Request,
  res: Response
) {
  try {
    const id = req.body.id;
    const contact = await deleteContactService(id);

    if (!contact) res.status(404).send('Could not find the contact!');

    return res.send('The contact has been deleted!');
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function editContactController(
  req: Request,
  res: Response
) {
  try {
    const id = req.body.id;
    const data = req.body.data;

    const contact = await updateContactService(id, data);

    if (!contact) res.status(404).send('Could not find a contact!');

    return res.send('The contact has been edited!');
  } catch (e) {
    return res.sendStatus(500);
  }
}