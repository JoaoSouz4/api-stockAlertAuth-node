import {Router} from 'express';
import userController from './controller/userController';
import {checkLoginData} from './middleware/CheckLoginData';

const routes = Router();

routes.post('/post/login', checkLoginData, userController.login);
routes.get('/get/checktoken', userController.checkToken)
export default routes