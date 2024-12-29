import createError from 'http-errors';
//@ts-ignore
import { User } from '../../models';
import { Request, Response, NextFunction } from 'express'
import { ToDoRequestType } from '../types/todoType';
import { CreateAccountRequestType } from '../types/authTypes';

export const getProfile = async (req, res, next) => {
    try {
        let users;
        const userId = req.payLoad.aud
        if (userId) {
            users = await User.findByPk(userId);
        }
        if (!users) {
            throw createError[400]("No User Found")
        }
        res.send({ users })
    } catch (error) {
        next(error)
    }
}


export const updatePofile = async (req: Request<{}, {}, CreateAccountRequestType>, res: Response, next: NextFunction) => {
    try {
        const toDoRequest = req.body;
        const { firstName, lastName } = req.body;
        //@ts-ignore
        const userId = req.payLoad.aud
        if (!toDoRequest?.firstName) {
            throw createError.BadRequest("First name is required")
        }
        if (!toDoRequest?.lastName) {
            throw createError.BadRequest("Last name is required")
        }
        const userProfile = await User.findByPk(userId);
        if (!userProfile) {
            throw createError.Conflict("No User Found")
        }

        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        await userProfile.save();
        return res.send({ success: true });
    } catch (error) {
        next(error)
    }
}