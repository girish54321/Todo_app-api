'use strict';
import createError from 'http-errors';
//@ts-ignore
import { User, Todo } from '../../models';
import { Request, Response, NextFunction } from 'express'
import fs = require('fs');
import { ToDoRequestType } from '../types/todoType';

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
        const userId = req.payLoad.aud
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

const createTdo = async (req: Request<{}, {}, ToDoRequestType>, res: Response, next: NextFunction) => {
    try {
        const toDoRequest = req.body;

        if (!toDoRequest?.title) {
            throw createError.BadRequest("Title is required")
        }
        if (!toDoRequest?.body) {
            throw createError.BadRequest("Body is required")
        }
        if (!toDoRequest?.status) {
            throw createError.BadRequest("Status is required")
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
            status: toDoRequest?.status,
        })
        if (!createTodo) {
            throw createError.BadRequest("Failed to create todo")
        }
        return res.send({ todo: createTodo })
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
        const { title, body, id, status } = req.body;
        const toDo = await Todo.findByPk(id);
        toDo.title = title;
        toDo.body = body;
        toDo.status = status;
        await toDo.save();
        return res.send({ post: toDo });
    } catch (error) {
        next(error);
    }
}

export { createTdo, getUserTodo, getSelectedTodo, deleteToDo, updateTodo }