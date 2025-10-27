import supertest from "supertest";
import app from "../src/app";
import  httpStatus  from "http-status";
import { cleanDb, createNewCredentials } from "./factories/credentials-factory";
import { createUser } from "./factories/user-factory";


const api = supertest(app);


describe("Credential Resource", () => {  
let token:string
let credentialId: number

  beforeAll(async () => {
    await cleanDb();
    const {token: userToken} = await createUser();
    token = userToken

    const res = await api
    .post(`/credentials/`)
    .set("Authorization", `Bearer ${token}`)
    .send(createNewCredentials());

   if(!res.body.id) throw new Error("Credential not created");

    credentialId = res.body.id

})

    it("should create credential",async () => {
        const { status, body } = await api
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(createNewCredentials()); 
        
        expect(status).toBe(httpStatus.CREATED);
        expect(body).toHaveProperty("id");
    });

    it("should update credential",async () => {
        const { status } = await api
        .put(`/credentials/${credentialId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(createNewCredentials());
        expect(status).toBe(httpStatus.NO_CONTENT);
    })
        
        
    it("should list credentials",async () => {
       const { status , body} = await api
        .get("/credentials")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.OK);
        expect(body).toEqual(
            expect.arrayContaining([
            expect.objectContaining({ 
                id:expect.any(Number) ,
                title: expect.any(String),
                url: expect.any(String),
                username:expect.any(String), 
                password:expect.any(String), 
                userId:expect.any(Number)
                }),
            ])
        );
    });

    it("should delete credential",async () => {
        const { status } = await api
        .delete(`/credentials/${credentialId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(httpStatus.OK);
    })

    it("should return status 409 when title already exist",async () => {
        const credentialData = createNewCredentials();
        const firstRes = await api
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(credentialData);

        expect(firstRes.status).toBe(httpStatus.CREATED);
        expect(firstRes.body).toHaveProperty("id");

        const secondRes = await api
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`)
        .send(credentialData);

        expect(secondRes.status).toBe(httpStatus.CONFLICT);
    })

    it("should return status 404 when credential not found",async () => {
            const credencialData = createNewCredentials();
            const res = await api
            .put(`/credentials/`)
            .send(credencialData);
            expect(res.status).toBe(httpStatus.NOT_FOUND);
    }
        )
    
    it("should return status 404 when user not found",async () => {
        const { status } = await api .get("/users/1")

        expect(status).toBe(httpStatus.NOT_FOUND);
    })
});

