import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedUser } from "../../mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log(err));
  });

  afterAll(async ()=>{
    await connection.destroy()
  })

  test("Post/user Should be able to create a new user", async ()=>{
    const response = await request(app).post("/users").send(mockedUser)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("avatar")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("address")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")

    expect(response.body).not.toHaveProperty("password")
    expect(response.body).not.toHaveProperty("deletedAt")
    
    expect(response.body.name).toEqual("usuarioTeste")
    expect(response.body.email).toEqual("petmatch@mail.com")
    expect(response.body.isActive).toEqual(true)
    expect(response.status).toBe(201)

  })

  test("Post/user should not be able create user already exists", async()=>{
    const response = await request(app).post("/users").send(mockedUser)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)
  })


}); //end describe
