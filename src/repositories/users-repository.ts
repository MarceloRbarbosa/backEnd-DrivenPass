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

async function findUserById(id:number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user
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

async function DeleteUser(id: number) {
    const user = await prisma.user.delete({
        where: {
            id
        }
    })
    return user
}

const usersRepository = {
    createNewUser,
    findAllUser,
    findUserByEmail,
    findUserById,
    UpdateUser,
    DeleteUser
}

export default usersRepository;