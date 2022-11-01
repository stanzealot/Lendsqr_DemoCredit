import express from 'express';
const router = express.Router();
import {UsersController} from '../controller/userController'
import { auth } from '../middleware/auth';
/* GET users listing. */
const controller = new UsersController()
router.get('/',controller.getAllUsers);
router.get('/:id',controller.findById)
router.post('/',controller.createUser)
router.post('/login',controller.login)
router.patch('/:id',controller.update)
router.delete('/:id',controller.remove)

export default router;
