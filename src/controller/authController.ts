import createError = require('http-errors')
import { Request, Response, NextFunction } from 'express'
//@ts-ignore
import { User, Todo } from '../../models'
import { CreateAccountRequestType, LoginRequestType } from '../types/authTypes'
import { signAccessToken, signRefreshToken, hashPassword, isValidPassword } from '../helper/jwthelper'

const createAccount = async (req: Request<{}, {}, CreateAccountRequestType>, res: Response, next: NextFunction) => {
    try {
        const requestData = req.body;
        if (!requestData?.email) {
            throw createError.BadRequest("Email is required")
        }
        if (!requestData?.password) {
            throw createError.BadRequest("Password is required")
        }
        if (!requestData?.firstName) {
            throw createError.BadRequest("First Name is required")
        }
        if (!requestData?.lastName) {
            throw createError.BadRequest("Last Name is required")
        }
        const diesExist = await User.findOne({ where: { email: requestData.email } });
        if (diesExist) {
            throw createError.Conflict("Email already is used")
        }
        let createdUser = await User.create(requestData);

        const USER_ID = createdUser.dataValues.userId.toString()
        const accessToken = await signAccessToken(USER_ID)
        const refreshToken = await signRefreshToken(USER_ID)
        const newPassword = await hashPassword(requestData.password)
        const user = await User.findOne({ where: { userId: USER_ID } })
        if (!newPassword) {
            throw createError.BadRequest()
        }
        console.log("newPassword", newPassword);

        user.password = newPassword
        await user.save()
        res.send({ accessToken, refreshToken })
    } catch (error) {
        console.log("Create Account Error: " + error);

        next(error)
    }
}

const login = async (req: Request<{}, {}, LoginRequestType>, res: Response, next: NextFunction) => {
    try {
        const loginRequest = req.body;

        if (!loginRequest?.email) {
            throw createError.BadRequest("Email is required")
        }
        if (!loginRequest?.password) {
            throw createError.BadRequest("Password is required")
        }

        const findUser = await User.findOne({ where: { email: loginRequest.email } }, { raw: true })
        if (!findUser) {
            throw createError.BadRequest("Email Or Password is wrong")
        }

        const dataBasePassword = findUser?.password;
        const userId = findUser?.userId;
        const isMatch = await isValidPassword(dataBasePassword, loginRequest.password)
        if (!isMatch) {
            throw createError.BadGateway("Email Or Password is wrong")
        }

        const refreshToken = await signRefreshToken(userId)
        const accessToken = await signAccessToken(userId)
        const user = await User.findOne({ where: { userId } })
        res.send({ user, accessToken, refreshToken })
        // console.log("My Custom Authentication");
        // const user = await User.create({
        //     email: "girish@gmail.com", firstName: "Girish", lastName: "Parate"
        // });
        // const user = await User.findByPk("381a0016-39d0-40d0-8815-2e61e74de4fa")
        // if (!user) {
        //     throw createError.Conflict("No User Found")
        // }
        // let todo = await user.getTodos();
        // let todo = await Todo.findByPk('e9d57c42-d992-47ac-87a0-4eefe40eb35f', {
        //     include: 'user'
        // });
        // const user = await todo.getUser();
        // console.log("user", user.toJSON());
        // let user = await todo.getUser()
        //@ts-ignore
        // const post = await user.createTodo({
        //     title: "Sample Todo",
        //     body: "Some Body text",
        //     description: "This is a sample todo",
        //     status: "pending",
        // })
        // const todo = await user.gettodos()
        // console.log("user", user)
        // const PASSWORD = user.dataValues.password.toString()
        // if (!PASSWORD) {
        //     throw createError.Conflict("No Pass")
        // }

        // const USER_ID = user.dataValues.id.toString()
        // const isMatch = await isValidPassword(PASSWORD, result.password)
        // if (!isMatch) {
        //     throw createError.BadGateway("Email Or Password is wrong")
        // }
        // const accessToken = await signAccessToken(USER_ID)
        // const refreshToken2 = await signRefreshToken(USER_ID)
        // res.send({ todo, user })
    } catch (error) {
        next(error)
    }
}

export { login, createAccount }