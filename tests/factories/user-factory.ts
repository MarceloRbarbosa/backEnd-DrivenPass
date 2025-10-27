import { faker } from "@faker-js/faker";
import supertest = require("supertest");
import app from "../../src/app";
import { sign } from "jsonwebtoken";

const api = supertest(app)
export function generateUserData(){
    const password = faker.internet.password(7);
    return { 
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password,
    }
}
export async function createUser(){
   const userData = generateUserData();
    const signUpRes = await api.post("/sign-up").send(userData);
    const signInRes = await api.post("/sign-in").send({
        email: userData.email,
        password: userData.password
    });

    const token = signInRes.body.token;

    return {
        user:{
            ...userData, id:signUpRes.body.id
        },
        token
    };
}

    

