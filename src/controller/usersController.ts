import createError from 'http-errors';
//@ts-ignore
import { User, File } from '../../models';
import { Request, Response, NextFunction } from 'express'
import { FileRequestType, ToDoRequestType } from '../types/todoType';
import { CreateAccountRequestType } from '../types/authTypes';
import { deleteFile, deleteFileStorage } from '../middlewares/fileHelper';

export const getProfile = async (req, res, next) => {
    try {
        let users;
        const userId = req.payLoad.aud
        if (userId) {
            users = await User.findByPk(userId, {
                raw: true
            });
        }
        const findFile = await File.findAll({
            where: { userId: userId, toDoId: null },
        })
        if (!users) {
            throw createError[400]("No User Found")
        }
        res.send({
            users: {
                ...users,
                files: findFile
            }
        })
    } catch (error) {
        next(error)
    }
}


export const updatePofile = async (req: Request<{}, {}, CreateAccountRequestType>, res: Response, next: NextFunction) => {
    try {
        const toDoRequest = req.body;
        const { firstName, lastName } = req.body;
        // @ts-ignore
        const file: FileRequestType = req?.file
        //@ts-ignore
        const userId = req.payLoad.aud
        if (!toDoRequest?.firstName) {
            deleteFile(file)
            throw createError.BadRequest("First name is required")
        }
        if (!toDoRequest?.lastName) {
            deleteFile(file)
            throw createError.BadRequest("Last name is required")
        }
        const userProfile = await User.findByPk(userId);
        if (!userProfile) {
            deleteFile(file)
            throw createError.Conflict("No User Found")
        }

        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        await userProfile.save();

        const findFile = await File.findOne({
            where: { userId: userId, toDoId: null },
        })

        if (findFile && file) {
            let delteFile = findFile.toJSON()
            deleteFileStorage(delteFile)
            findFile.fileName = file?.path
            await findFile.save()
        } else if (file) {
            const createTodoImage = await userProfile.createFile({
                fileName: file?.path,
                type: file?.mimetype,
                fileSize: file?.size,
            })
            if (!createTodoImage) {
                deleteFile(file)
                throw createError.BadRequest("Failed to create file")
            }
        }
        return res.send({ success: true });
    } catch (error) {
        next(error)
    }
}