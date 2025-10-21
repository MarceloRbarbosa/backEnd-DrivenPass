import usersRepository from "repositories/users-repository";


async function createNewUser({name, email, password}: {name: string, email: string, password: string}) {
    const newUser = await usersRepository.createNewUser({name, email, password});

    const conflict = await usersRepository.findUserByEmail(email);
    if (conflict) throw { 
        type: "conflict",
        message: "Email already exists"
    };
    return newUser;
}
const usersServices = {
    createNewUser
}

export default usersServices;