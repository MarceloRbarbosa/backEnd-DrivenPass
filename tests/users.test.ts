import supertest from "supertest";
import app from "../src/app";
import  httpStatus  from "http-status";
import { createUser, generateUserData }  from "./factories/user-factory";
import { cleanDb } from "./factories/credentials-factory";

const api = supertest(app);

describe("User Resource", () => {  
    beforeAll(async () => {
        await cleanDb();
    })

   it("should sign up a new user", async () => {
      const userData = generateUserData(); 
      const res = await api.post("/sign-up").send(userData);

      expect(res.status).toBe(httpStatus.CREATED);
    });

    it("should sign in a user", async () => {
        const { user } = await createUser();

        const res = await api.post("/sign-in").send({
        email: user.email,
        password: user.password
        });

      expect(res.status).toBe(httpStatus.OK);
      expect(res.body).toHaveProperty("token");
      });
     
    });

  describe("User Validation testing", () => {
    
    beforeAll(async () => {
        await cleanDb();
    })

    it("should return status 409 when email already exist", async () => {
        const userData = generateUserData(); 
        await api.post("/sign-up").send(userData);
        const res = await api.post("/sign-up").send(userData);
        expect(res.status).toBe(httpStatus.CONFLICT);
    })

    it("should return status 401 when password is wrong", async () => {
        const userData = generateUserData(); 
        await api.post("/sign-up").send(userData);
        const res = await api.post("/sign-in").send({
            email: userData.email,
            password: "wrongPassword"
        });
        expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    })

    it("should return status 404 when email not found",async () => {
        const email = "notfound@notfound.com";
        const fakePassword = "wrongPassword";

        const{status} = await api.post("/sign-in").send({
            email,
            password: fakePassword
        })
        expect(status).toBe(httpStatus.NOT_FOUND);
    })

    it("should erase a user ",async () => {
       const { user } = await createUser();

       const res = await api.post("/sign-in").send({
        email: user.email,
        password: user.password
        });

        const token = res.body.token;
        const {status} = await api.delete("/erase").set("Authorization", `Bearer ${token}`);
        expect(status).toBe(httpStatus.OK);
    })

    it("should return status 404 when user not found",async () => {
        const { token } = await createUser();
        const fakeUserId = "9999999999999";
        const res = await api.delete(`/users/${fakeUserId}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(httpStatus.NOT_FOUND);
    })

  })
