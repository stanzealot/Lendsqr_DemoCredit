import express from 'express';
const router = express.Router();
import {TransferController} from '../controller/transferController'
/* GET home page. */
const controller = new TransferController()
router.get('/',controller.getAllTransfer)
router.post('/:userId',controller.transfer)
router.delete('/:id',controller.removeTransfer)

export default router;
