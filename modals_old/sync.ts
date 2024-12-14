// // sync.js

// import myDb from "./databaseAuth";
// import { UserModal } from "./User";
// import ToDoModal from "./ToDoTable";

// const stateDp = (async () => {
//     try {
//         UserModal.hasMany(ToDoModal, {
//             foreignKey: 'userId',
//         });
//         ToDoModal.belongsTo(UserModal, {
//             foreignKey: 'userId',
//         });
//         await myDb.sync({ alter: true });
//         console.log("Dp Authentication");

//         // let newCreatedUser = await UserModal .create({
//         //     name: 'Girish',
//         //     lastName: 'Shah',
//         //     password: 'password123',
//         //     email: 'giris123h@gmail.com',
//         // })
//         // console.log("newCreatedUser", newCreatedUser.toJSON());

//         // let newToDo = await newCreatedUser.createPost({
//         //     title: 'Hello World',
//         //     body: 'This is a post',
//         // })
//         // console.log("NewToDO", newToDo.toJSON());

//         // let user = await UserModal.findOne({
//         //     where: { email: 'giris123h@gmail.com' },
//         // })
//         //@ts-ignore
//         // let data = await user.getPosts({ raw: true });
//         // console.log("Data", data);

//         // console.log(JSON.stringify(user));
//         // if (!user) {
//         //     user = await MyUserTable.create({ name: 'Default User', email: "girish@gmail.com" }); // Replace 'name' with actual fields
//         // }
//         // console.log({ user });
//         // let data = await user.getPosts({ raw: true });
//         // // console.log("All post", data);
//         // console.log({
//         //     userId: user.toJSON(),
//         //     posts: data,
//         //     totalPosts: data.length,
//         // });

//         // Ensure the association method is correct
//         // await user.createPost({
//         //     title: 'Hello World',
//         //     body: 'This is a post',
//         // });
//     } catch (error) {
//         console.error('Error creating the table:', error);
//     } finally {
//         await myDb.close();
//     }
// });


// export default stateDp;