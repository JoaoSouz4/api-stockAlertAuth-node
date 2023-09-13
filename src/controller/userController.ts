import User from '../model/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';

require('dotenv').config();


class userController {
    public static async login(req: Request, res: Response,){
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

    public static async updatePass(req: Request, res: Response){

        const {id, pass} = req.body;
        
        try{
            const userTarget = await User.findById({_id: id});
            const salt = await bcrypt.genSalt(12);
            const newPass = await bcrypt.hash(pass, salt);

            await userTarget?.updateOne({pass: newPass});

            res.status(200).json({
                isSucess: true,
                requestMessage: 'Senha atualizada com sucesso'
            })
        }catch(e){
            res.status(400).json({
                isSucess: false,
                requestMessage: 'erro ao atualizar a senha'
            })
        }
    }

    public static async checkToken(req: Request, res: Response,){
        const authHeader = req.headers['authorization'];
        const token: any = authHeader && authHeader.split(" ")[1];
        const secret : any = process.env.SECRET;

        try {
            const isValid = jwt.verify(token, secret);
            res.status(200).json({
                isSucess: true,
                requestMessage: 'Token validado com sucesso',
                requestData: {
                    isValid
                }
            })

        } catch(error){

            res.status(400).json({
                isSucess: false,
                requestMessage: 'Token Invalido'
            })
        }
    }
}

export default userController