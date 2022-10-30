import express from 'express';
const router = express.Router();
import {AccountController} from '../controller/accountController'
/* GET home page. */
const controller = new AccountController()
router.get('/',controller.getAccounts);
router.get('/:userId',controller.getUserAccounts)
router.post('/:userId',controller.createAccount)

export default router;
