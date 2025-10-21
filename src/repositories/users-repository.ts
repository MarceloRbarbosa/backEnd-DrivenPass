import  prisma  from "../config/database";

async function createNewUser({name, email, password}: {name: string, email: string, password: string}) {
    const newUser =await prisma.user.create({
        data: {
            name,
            email, 
            password,
        }
    })

    return newUser;
}

async function findAllUser() {
    const users = await prisma.user.findMany();

    return users;
}

async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

async function UpdateUser(name: string, email: string, password: string) {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            name,
            password
        }
    })
}

async function DeleteUser(email: string) {
    const user = await prisma.user.delete({
        where: {
            email
        }
    })
}

const usersRepository = {
    createNewUser,
    findAllUser,
    findUserByEmail,
    UpdateUser,
    DeleteUser
}

export default usersRepository;