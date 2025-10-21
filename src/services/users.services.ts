import usersRepository from "../repositories/users-repository";


async function createNewUser({name, email, password}: {name: string, email: string, password: string}) {  
    const conflict = await usersRepository.findUserByEmail(email);
    if (conflict) throw { 
        type: "conflict",
        message: "Email already exists"
    };
    
    const newUser = await usersRepository.createNewUser({name, email, password});
    
    return newUser;
}


async function findUsers(email: string, password: string) {
    const user = await usersRepository.findUserByEmail(email);

    if(!user) throw { 
        type: "NOT_FOUND",
        message: "User not found"
    };

    return user;
}

const usersServices = {
    createNewUser,
    findUsers
}

export default usersServices;