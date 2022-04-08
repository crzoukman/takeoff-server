import { Router } from "express";
import { createContactController, deleteContactController, editContactController, getContactsController } from "../controller/contacts.controller";
import { checkToken } from "../middleware/checkToken";

const router = Router();

router.post(
  '/api/createContact',
  checkToken,
  createContactController
);

router.get(
  '/api/getContacts',
  checkToken,
  getContactsController
)

router.post(
  '/api/deleteContact',
  checkToken,
  deleteContactController
);

router.post(
  '/api/editContact',
  checkToken,
  editContactController
);

export default router;