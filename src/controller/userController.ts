import User from '../model/userModel';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response} from 'express';
require('dotenv').config();


class userController {
    public static async login(req: Request, res: Response, next: NextFunction){
        const {isUser: user} = (req as any ).userAuthenticated;
        const secret : any = process.env.SECRET;

        try {
            const token = jwt.sign({id: user?._id, user: user?.user},secret,{})

            res.status(200).json({
                isSucess: true,
                requestMessage: `usuário ${user.user} autenticado.`,
                dataRequest: {
                    token: token
                }
            })
        } catch(e){
            console.log(e)
        }
         
    }
}

export default userController