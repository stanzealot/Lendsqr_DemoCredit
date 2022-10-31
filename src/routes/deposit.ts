import express from 'express';
const router = express.Router();
import {DepositController} from '../controller/depositController'
/* GET home page. */
const controller = new DepositController()
router.get('/',controller.getAllDeposits)
router.get('/:userId',controller.getUserDeposit)
router.patch('/:userId',controller.deposit);
router.delete('/:id',controller.removeDeposit)

export default router;
