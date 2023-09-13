import {Router} from 'express';
import userController from './controller/userController';
import {checkLoginData} from './middleware/CheckLoginData';

const routes = Router();

routes.post('/post/login', checkLoginData, userController.login);
routes.post('/post/updatepass', userController.updatePass)
routes.get('/get/checktoken', userController.checkToken)
export default routes