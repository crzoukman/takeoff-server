import { Router } from "express";
import auth from './auth.routes';
import contacts from './contacts.routes';

const router = Router();

router.get('/ping', (_, res) => res.sendStatus(200));

router.use(auth);
router.use(contacts);

export default router;