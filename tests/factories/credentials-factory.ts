import prisma from "config/database";
import { faker } from "@faker-js/faker";

async function cleanDb() {
        await prisma.credential.deleteMany({});
        await prisma.user.deleteMany({});
        }


function createNewCredentials() {
    return {
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password()
    }       
    }


export { 
    cleanDb,
    createNewCredentials,
 }