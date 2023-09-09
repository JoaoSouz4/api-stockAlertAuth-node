import User from '../model/userModel';
import { NextFunction, Request, Response} from 'express';

export async function checkLoginData(req: Request, res: Response, next: NextFunction){
    const {user, pass} = req.body;

    const isUser = await User.findOne({user: user});
    if(!isUser) return res.status(400).json(
        {
            isSucess: false,
            requestMessage: 'usuário não encontrado'
        }
    )

    if(pass != isUser?.pass){
        return res.status(400).json(
            {
                isSucess: false,
                requestMessage: 'senha inválida'
            }
        )
    }
    (req as any).userAuthenticated = {isUser}
    next();
}