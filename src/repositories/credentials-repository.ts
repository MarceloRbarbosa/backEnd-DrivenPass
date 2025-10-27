import prisma from "../config/database";

async function createCredentials({title, url, username, password, userId}: {title: string, url: string, username: string, password: string, userId: number}) {
     const newCredential = await prisma.credential.create({
          data: {
                title,
                url, 
                username, 
                password,
                userId
          }
    })

     return newCredential;
}

async function findAllCredentialsByUserId(userId: number) {
    const credentials = await prisma.credential.findMany({
        where:{ userId}
    });

    return credentials;
}

async function findCredentialById(id: number) {
    const credential = await prisma.credential.findFirst({
        where: {
            id
        }
    })

    return credential
}

async function findCredentialByTittle(title: string) {
    const credential = await prisma.credential.findFirst({
        where: {
            title
        }
    })

    return credential
}

async function updateCredential({
        id,
        userId,
        ...data
    }: {
        id: number,
        userId: number,
        title?: string,
        url?: string,
        username?: string,
        password?: string
    }) {
   return prisma.credential.updateMany({
        where: {
            id,
            userId
        },
        data,
    });
}

async function deleteCredential(id: number) {
    return prisma.credential.delete({
        where: {
            id
        }
    });
}


const credentialsRepository = {
    createCredentials,
    findAllCredentialsByUserId,
    findCredentialById,
    findCredentialByTittle,
    updateCredential,
    deleteCredential
};

export default credentialsRepository;