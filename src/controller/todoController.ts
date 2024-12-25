'use strict';
import createError from 'http-errors';
//@ts-ignore
import { User, Todo } from '../../models';
import { Request, Response, NextFunction } from 'express'
import { ToDoRequestType } from '../types/todoType';
import paginateHelper from '../helper/paginateHelper';

const getUserTodo = async (req, res, next) => {
    try {
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)
        const findAllTodo = await findUser.getTodos();
        if (!findAllTodo) {
            res.send({ todo: [] })
            return
        }
        res.send({ todo: findAllTodo })
    } catch (error) {
        next(error)
    }
}

const getSelectedTodo = async (req, res, next) => {
    try {
        const id = req.params.id
        const todo = await Todo.findByPk(id, { raw: true });
        if (!todo) {
            res.send({ todo: [] })
            return
        }
        res.send({ todo })
    } catch (error) {
        next(error)
    }
}


const getAllTheTodo = async (req, res, next) => {
    try {
        const userId = req.payLoad.aud
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);

        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber;
        }

        let size = 5;
        if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
            size = sizeAsNumber;
        }

        const usersWithCount = await Todo.findAndCountAll({
            where: {
                userId: userId
            },
            order: [['updatedAt', 'DESC']],
            ...paginateHelper({
                currentPage: page,
                pageSize: size,
            }),
        });
        res.send({
            total_pages: Math.ceil(usersWithCount.count / Number.parseInt(`${size}`)),
            total: usersWithCount.count,
            per_page: size,
            page: page,
            todo: usersWithCount.rows,
        });

    } catch (error) {
        console.log("Add Bluck Error: " + error);
        next(error)
    }
}

const createTdo = async (req: Request<{}, {}, ToDoRequestType>, res: Response, next: NextFunction) => {
    try {
        const toDoRequest = req.body;

        if (!toDoRequest?.title) {
            throw createError.BadRequest("Title is required")
        }
        if (!toDoRequest?.body) {
            throw createError.BadRequest("Body is required")
        }
        if (!toDoRequest?.state) {
            throw createError.BadRequest("State is required")
        }
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.Conflict("No User Found")
        }

        const createTodo = await findUser.createTodo({
            title: toDoRequest.title,
            body: toDoRequest.body,
            state: toDoRequest?.state,
        })
        if (!createTodo) {
            throw createError.BadRequest("Failed to create todo")
        }
        return res.send({ success: true })
    } catch (error) {
        next(error)
    }
}

const deleteToDo = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            throw createError.Conflict("No ToDo Found")
        }
        const userId = req.payLoad.aud;
        let imagePath = null;
        if (req.file && req.file.path) {
            imagePath = req.file.path;
        }
        const toDo = await Todo.findByPk(id);
        if (toDo) {
            await toDo.destroy();
            return res.send({ deleted: true });
        } else {
            return res.send({ deleted: false });
        }
    } catch (error) {
        next(error);
    }
}

const updateTodo = async (req: Request<{}, {}, ToDoRequestType>, res: Response, next: NextFunction) => {
    try {
        const toDoRequest = req.body;
        const { title, body, toDoId, state } = req.body;
        if (!toDoRequest?.title) {
            throw createError.BadRequest("Title is required")
        }
        if (!toDoRequest?.body) {
            throw createError.BadRequest("Body is required")
        }
        if (!toDoRequest?.state) {
            throw createError.BadRequest("Status is required")
        }
        const toDo = await Todo.findByPk(toDoId);
        if (!toDo) {
            throw createError.Conflict("No ToDo Found")
        }
        toDo.title = title;
        toDo.body = body;
        toDo.state = state;
        await toDo.save();
        return res.send({ success: true });
    } catch (error) {
        next(error);
    }
}

const testAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send({ message: "Authenticated" });
    } catch (error) {
        next(error);
    }
}

export { createTdo, getUserTodo, getSelectedTodo, deleteToDo, updateTodo, getAllTheTodo, testAuth }