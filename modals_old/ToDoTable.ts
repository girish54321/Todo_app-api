// // models/Demo.js
// import { DataTypes } from 'sequelize';
// import myDb from './databaseAuth';

// const ToDoModal = myDb.define('Post', {
//     toDoId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         validate: {
//             notEmpty: {
//                 msg: 'ID cannot be empty.'
//             }
//         }
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Title cannot be empty.'
//             }
//         }
//     },
//     body: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Body cannot be empty.'
//             }
//         }
//     },
//     state: {
//         type: DataTypes.ENUM('pending', 'completed'),
//         defaultValue: 'pending',
//         allowNull: false,
//         validate: {
//             isIn: [['pending', 'completed']],
//             notEmpty: {
//                 msg: 'State must be either pending or completed.'
//             }
//         }
//     }
// }, {
//     paranoid: true,
// });

// export default ToDoModal;
