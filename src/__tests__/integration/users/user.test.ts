import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedUpdate, mockedUser, mockedUserLogin } from "../../mocks/user.mocks";


describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => connection = res)
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
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    // expect(response.body).toHaveProperty("address")

    expect(response.body.address).toHaveProperty("city")
    expect(response.body.address).toHaveProperty("state")
    expect(response.body.address).toHaveProperty("street")
    expect(response.body.address).toHaveProperty("number")
    expect(response.body.address).toHaveProperty("zipCode")

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

  //get list
  test("GET /users: Should be able list users", async()=>{
   await request(app).post("/users").send(mockedUser)
     const response = await request(app).post("login").send(mockedUserLogin)
     const responseLogin = await request(app).get("/users").set("Authorization", `Bearer ${response.body.token}`)

    expect(responseLogin.body).toHaveLength(1)
    expect(responseLogin.body).not.toHaveProperty("password")
  })

  test("GET /users: should be not list users if don't have token", async ()=>{
    const  response = await request(app).get("/users")
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  
  // Update  user
  test("PATCH /users/:id -  should be able to update user",async () => {

    const responseLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${responseLogin.body.token}`
    
    const userUpdate = await request(app).get("/users").set("Authorization", token)
    const userId = userUpdate.body[0].id

    const response = await request(app).patch(`/users/${userId}`).set("Authorization",token).send(mockedUpdate)
    const userUpdated = await request(app).get("/users").set("Authorization", token)

    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual("usuarioTeste")
    expect(userUpdated.body[0].email).toEqual("petmatch@mail.com")
    expect(userUpdated.body[0].password).toEqual("123456")
    expect(userUpdated.body[0].phone).toEqual("21971717171")
    expect(userUpdated.body[0].avatar).toEqual("img")
    
    expect(userUpdated.body[0]).not.toHaveProperty("password")
})

test("PATCH /users/:id -  should not be able to update user without authentication", async()=>{
  
})





}); //end describe
