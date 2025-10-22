import credentialsRepository from "../repositories/credentials-repository";

async function createCredentials({title, url, username, password, userId}: {title: string, url: string, username: string, password: string, userId: number}) {
    const conflict = await credentialsRepository.findCredentialByTittle(title);
    if (conflict && conflict.userId === userId) throw { 
        type: "conflict",
        message: "Title already exists"
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
    const result = await credentialsRepository.deleteCredential(id);
    if(!result) throw {
        type: "NOT_FOUND",
        message: "Credential not found"
    };
}
const credentialsService = {
    createCredentials,
    findAllCredentials,
    findCredentialById,
    updateCredential,
    deleteCredential
}

export default credentialsService;