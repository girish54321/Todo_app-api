import { Router } from 'express'
const todoRout = Router()
import { createTdo, getUserTodo, getSelectedTodo, updateTodo, deleteToDo, getAllTheTodo } from '../controller/todoController'

todoRout.post("/addtodo", createTdo)
todoRout.post("/updatetodo", updateTodo)
todoRout.get("/gettodo", getUserTodo)
todoRout.get("/gettodo/:id", getSelectedTodo)
todoRout.delete("/deletetodo/:id", deleteToDo)

todoRout.get("/getalltodos", getAllTheTodo)

export default todoRout
