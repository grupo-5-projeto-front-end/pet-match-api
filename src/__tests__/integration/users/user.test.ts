import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedSegundLogin, mockedSegundUser, mockedUpdate, mockedUser, mockedUserLogin } from "../../mocks";


describe("/users", () => {
  let connection: DataSource;
  const baseURL = "/users"

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => connection = res)
      .catch((err) => console.log(err));
  });

  afterAll(async ()=>{
    await connection.destroy()
  })

  test("Post/user Should be able to create a new user", async ()=>{
    const response = await request(app).post(baseURL).send(mockedUser)

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
    const response = await request(app).post(baseURL).send(mockedUser)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(409)
  })

  //get list
  test("GET /users: Should be able list users", async()=>{
     const responseLogin = await request(app).post("/login").send(mockedUserLogin)
     const response = await request(app).get(baseURL)

    expect(response.body).toHaveProperty("map");
    expect(response.status).toBe(200);

  })

  test("GET /users/<id> -> Deve ser capaz de listar um usuário", async () => {
    // const loginRes = await request(app).post("/login").send(mockedUserLogin);
  
    const getuser = await request(app).get(baseURL)
    const userId = getuser.body[0].id

    const  response = await request(app).get(`${baseURL}/${userId}`)

    expect(response.body).toHaveProperty("id")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("avatar")
    expect(response.body).toHaveProperty("isActive")
    expect(response.body).toHaveProperty("createdAt")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).toHaveProperty("address")
    expect(response.body).not.toHaveProperty("password")
    expect(response.body).not.toHaveProperty("deletedAt")

    expect(response.status).toBe(200)

})
  
  // Update  user
  test("PATCH /users/:id -  should be able to update user",async () => {

    const responseLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${responseLogin.body.token}`
    
    const getUsers = await request(app).get(baseURL)
    const userId = getUsers.body[0].id

    const response = await request(app).patch(`${baseURL}/${userId}`).set("Authorization",token).send(mockedUpdate)



    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("email")
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("phone")
    expect(response.body).toHaveProperty("avatar")
    expect(response.body).toHaveProperty("updatedAt")
    expect(response.body).toHaveProperty("createdAt")
    
    expect(response.body).not.toHaveProperty("password")
})

test("PATCH /users/:id -  should not be able to update user without authentication", async()=>{
  const userUpdate = await request(app).get(baseURL)

  const response = await request(app).patch(`${baseURL}/${userUpdate.body[0].id}`).send(mockedUpdate)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(401)
  
})

test("PATCH /users/:id - should not be able to update user with invalid id", async ()=>{
  const responseLogin = await request(app).post("/login").send(mockedUserLogin);
  const token = `Bearer ${responseLogin.body.token}`
  
  const response = await request(app).patch(`${baseURL}/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization",token).send(mockedUpdate)
  
  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(404)
})


//Delete
test("DELETE /users/:id -  should not be able to delete user without authentication",async () => {
  // const userDelete = await request(app).get(baseURL)
  const response = await request(app).delete(baseURL)
  expect(response.status).toBe(401)
  expect(response.body).toHaveProperty("message")      
})

test("DELETE /users/:id -  Must be able to soft delete user", async ()=>{
  await request(app).post(baseURL).send(mockedSegundUser)

  const responseLogin2 = await request(app).post("/login").send(mockedSegundLogin)
  // const responseDelete = await request(app).get(baseURL)

  const response = await request(app).delete(baseURL).set("Authorization", `Bearer ${responseLogin2.body.token}`)


  expect(response.status).toBe(204)

})


}); //end describe
