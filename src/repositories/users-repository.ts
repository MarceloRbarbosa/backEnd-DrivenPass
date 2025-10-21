import  prisma  from "../config/database";


async function createNewUser({name, email, password}: {name: string, email: string, password: string}) {
    const newUser =await prisma.users.create({
        data: {
            name,
            email, 
            password,
        }
    })

    return newUser;
}


const usersRepository = {
    createNewUser
}

export default usersRepository;