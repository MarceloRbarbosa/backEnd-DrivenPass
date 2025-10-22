import usersRepository from "../repositories/users-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


async function createNewUser({name, email, password}: {name: string, email: string, password: string}) {  
    const conflict = await usersRepository.findUserByEmail(email);
    if (conflict) throw { 
        type: "conflict",
        message: "Email already exists"
    };
    
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await usersRepository.createNewUser({
        name, 
        email, 
        password: passwordHash
    });
    
    return newUser;
}


async function findUsers(email: string, password: string) {
    const user = await usersRepository.findUserByEmail(email);

    if(!user) throw { 
        type: "NOT_FOUND",
        message: "User not found"
    };

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw { 
        type: "NOT_FOUND",
        message: "Invalid Password"
    };

    const token = jwt.sign(
        { id: user.id },
         process.env.JWT_SECRET as string,
        { expiresIn: "5d" });

    return token;
}

const usersServices = {
    createNewUser,
    findUsers
}

export default usersServices;