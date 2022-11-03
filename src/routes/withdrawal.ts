import express from 'express';
const router = express.Router();
import {WithdrawalController} from '../controller/withdrawalController'
/* GET home page. */
const controller  = new WithdrawalController()
router.get('/',controller.getAllWithdrawals)
router.post('/:userId',controller.withdraw)
router.delete('/:id',controller.removeWithdrawal)

export default router;
