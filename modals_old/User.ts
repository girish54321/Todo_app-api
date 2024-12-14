// import { DataTypes } from 'sequelize';
// import myDb from './databaseAuth';

// export const UserModal = myDb.define('User', {
//     userId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Name cannot be empty.'
//             }
//         }
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Last name cannot be empty.'
//             }
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: {
//                 msg: 'Password cannot be empty.'
//             }
//         }
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: {
//                 msg: 'Please enter a valid email address.'
//             },
//             notEmpty: {
//                 msg: 'Email address cannot be empty.'
//             }
//         }
//     },
// }, {
//     paranoid: true
// });
