import express from 'express';
const router = express.Router();
import {AccountController} from '../controller/accountController'
import { auth } from '../middleware/auth';
/* GET home page. */
const controller = new AccountController()
router.get('/',controller.getAccounts);
router.get('/:userId',controller.getUserAccounts)
router.post('/:userId',controller.createAccount)
router.delete('/:id',controller.removeAccount)

export default router;
