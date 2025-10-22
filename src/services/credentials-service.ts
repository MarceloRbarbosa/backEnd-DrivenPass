import credentialsRepository from "../repositories/credentials-repository";
import usersRepository from "../repositories/users-repository";


async function createCredentials({title, url, username, password, userId}: {title: string, url: string, username: string, password: string, userId: number}) {
    
    
    const conflict = await credentialsRepository.findCredentialByTittle(title);
    if (conflict && conflict.userId === userId) throw { 
        type: "conflict",
        message: "Title already exists"
    };

    const user = await usersRepository.findUserById(userId);
    if(!user) throw {
        type: "NOT_FOUND",
        message: "User not found"
    };
    
    const newCredential = await credentialsRepository.createCredentials({title, url, username, password, userId})

    return newCredential;
}

async function findAllCredentials() {      
    const credentials = await credentialsRepository.findAllCredentials()
    
    return credentials;
}

async function findCredentialById(id: number) {
    const credentials = await credentialsRepository.findCredentialById(id)

   const user = await usersRepository.findUserById(credentials.userId);
    if(!user) throw {
        type: "NOT_FOUND",
        message: "User not found"
    };
    
    if(!credentials) throw {
        type: "NOT_FOUND",
        message: "Credential not found"
    };


    return credentials;
}

async function updateCredential(data: {
    id: number,
  userId: number,
  title?: string,
  url?: string,
  username?: string,
  password?: string
}) {

    const user = await usersRepository.findUserById(data.userId);
    if(!user) throw {
        type: "NOT_FOUND",
        message: "User not found"
    };

    const conflict = await credentialsRepository.findCredentialByTittle(data.title);
    if (conflict && conflict.userId === data.userId) throw { 
        type: "conflict",
        message: "Title already exists"
    };

    const result = await credentialsRepository.updateCredential(data);
    if(result.count === 0) throw {
        type: "NOT_FOUND",
        message: "Credential not found"
    };
    
    
    return result
    }

async function deleteCredential(id: number) {
    const result = await credentialsRepository.findCredentialById(id);
    if(!result) throw {
        type: "NOT_FOUND",
        message: "Credential not found"
    };
    
    return await credentialsRepository.deleteCredential(id);
}
const credentialsService = {
    createCredentials,
    findAllCredentials,
    findCredentialById,
    updateCredential,
    deleteCredential
}

export default credentialsService;