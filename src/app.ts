require('dotenv').config();
import express = require('express');
import { sequelize } from '../models';
import morgan = require('morgan');
import createError = require('http-errors');
import authRoute from './route/authRoute';
import todoRout from './route/totoRoute';
import { verifyAccessToken } from './helper/jwthelper';
import profileRoute from './route/profilrRoute';
import fileUploadRoute from './route/uploadFileRoute';
const app = express()
//* Let Server Image
app.use('/todoimages', express.static('todoimages'))
app.use('/file', express.static('file'))
app.use('/profileimage', express.static('profileimage'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 2000
//* Routs
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/todo", verifyAccessToken, todoRout)
app.use("/api/v1/profile", profileRoute)
app.use("/api/v1/upload/file", verifyAccessToken, fileUploadRoute)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
    next(); // Call next to pass control to the next middleware
});

const start = async () => {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => {
            console.log(`Server Stated at: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
