import { Request , Response } from "express";
import credentialsServices from "../services/credentials-service";
import httpStatus from "http-status";


async function createCredentials(req: Request, res: Response) {
    const newCredential = req.body;

    await credentialsServices.createCredentials(newCredential);
    res.status(httpStatus.CREATED).send("Credential created successfully");
}

async function getCredentials(req: Request, res: Response) {

    const credentials = await credentialsServices.findAllCredentials();
    res.status(httpStatus.OK).send(credentials);
}

async function updateCredential(req: Request, res: Response) {
    const credentialId = Number(req.params.id);
    const userId = Number(req.params.userId);
    const { title, url, username, password } = req.body;

    await credentialsServices.updateCredential({ 
        id: credentialId, userId, title, url, username, password 
    });
    
    return res.status(httpStatus.OK).send("Credential updated successfully");
}

async function deleteCredential(req: Request, res: Response) {
    const credentialId = Number(req.params.id);
    await credentialsServices.deleteCredential(credentialId);
    res.status(httpStatus.OK).send("Credential deleted successfully");
}

const credentialsController = {
    createCredentials,
    getCredentials,
    updateCredential,
    deleteCredential
}

export default credentialsController;