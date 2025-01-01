import { Request, Response, NextFunction } from 'express'
//@ts-ignore
import { User, Todo, File } from '../../models';
import createError from 'http-errors';


//@ts-ignore
const uploadFile = async (req: Request<{}, {}, any>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)
        //@ts-ignore
        let imagePath = req?.file?.path || null
        //@ts-ignore
        console.log("req?.file", req?.file);

        if (!findUser) {
            throw createError.Conflict("No User Found")
        }
        // fileName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //   },
        //   fileSize: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //   },
        //   type: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //   }
        // req?.file {
        //     fieldname: 'file',
        //     originalname: 'Screenshot 2024-12-07 at 5.42.27 PM.png',
        //     encoding: '7bit',
        //     mimetype: 'image/png',
        //     destination: './file',
        //     filename: '1735664167212-361265073.png',
        //     path: 'file/1735664167212-361265073.png',
        //     size: 50429
        //   }

        const createTodo = await findUser.createFile({
            fileName: "fileName",
            type: "fileType",
            fileSize: "fileSize",
        })
        if (!createTodo) {
            throw createError.BadRequest("Failed to create file")
        }
        res.send({ done: true, createTodo })
    } catch (error) {
        console.log("Create Account Error: " + error);

        next(error)
    }
}


export { uploadFile }