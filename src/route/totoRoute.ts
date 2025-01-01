import { Router } from 'express'
const todoRout = Router()
import { createTdo, getUserTodo, getSelectedTodo, updateTodo, deleteToDo, getAllTheTodo, testAuth } from '../controller/todoController'
import { uploadFileMulter } from '../middlewares/fileUpload'

// todoRout.post("/addtodo", createTdo)
todoRout.post("/addtodo", uploadFileMulter.single('file'), createTdo)
todoRout.post("/updatetodo", updateTodo)
todoRout.get("/gettodo", getUserTodo)
todoRout.get("/gettodo/:id", getSelectedTodo)
todoRout.delete("/deletetodo/:id", deleteToDo)

todoRout.get("/getalltodos", getAllTheTodo)
todoRout.get("/test/auth", testAuth)

export default todoRout
