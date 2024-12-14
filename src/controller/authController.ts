import createError = require('http-errors')
import { authSchema, loginAuthSchema } from '../helper/validation'
//@ts-ignore
import { User, Todo } from '../../models'

// const createAccount = async (req, res, next) => {
//     try {
//         const result = await authSchema.validateAsync(req.body)
//         const diesExist = await User.findOne({ where: { email: result.email } });
//         if (diesExist) {
//             throw createError.Conflict("Email already is used")
//         }
//         const createdUser = await User.create(result)
//         const USER_ID = createdUser.dataValues.id.toString()
//         const accessToken = await signAccessToken(USER_ID)
//         const refreshToken = await signRefreshToken(USER_ID)
//         const password = await hashPassword(result.password)
//         const user = await User.findOne({ where: { id: USER_ID } })
//         if (!password) {
//             throw createError.BadRequest()
//         }
//         user.password = password
//         await user.save()
//         res.send({ accessToken, refreshToken })
//     } catch (error) {
//         next(error)
//     }
// }

const login = async (req, res, next) => {
    try {
        // stateDp();
        // const result = await loginAuthSchema.validateAsync(req.body)
        console.log("My Custom Authentication");
        // const user = await User.create({
        //     email: "girish@gmail.com", firstName: "Girish", lastName: "Parate"
        // });
        const user = await User.findByPk('1f5013a7-2902-4500-bd7c-0c3af8acef3a')
        // if (!user) {
        //     throw createError.Conflict("No User Found")
        // }
        let todo = await user.getTodos();
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
        res.send({ todo, user })
    } catch (error) {
        next(error)
    }
}

export { login }