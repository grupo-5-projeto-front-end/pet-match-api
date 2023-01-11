import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedSegundUser, mockedUpdate, mockedUser, mockedUserLogin } from "../../mocks/user.mocks";


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
   await request(app).post("/users").send(mockedUser)
     const response = await request(app).post("login").send(mockedUserLogin)
     const responseLogin = await request(app).get(baseURL).set("Authorization", `Bearer ${response.body.token}`)

    
    expect(response.body).toHaveProperty("map");
    expect(response.status).toBe(200);

    expect(responseLogin.body).not.toHaveProperty("password")
  })

  test("GET /users/<id> -> Deve ser capaz de listar um usuário", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
  
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


  test("GET /users: should be not list users if don't have token", async ()=>{
    const  response = await request(app).get(baseURL)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  })

  test("GET /users: should be not list users isActive ==false ", async ()=>{
    const  response = await request(app).get(baseURL)
    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)
  })

  
  // Update  user
  test("PATCH /users/:id -  should be able to update user",async () => {

    const responseLogin = await request(app).post("/login").send(mockedUserLogin);
    const token = `Bearer ${responseLogin.body.token}`
    
    const userUpdate = await request(app).get(baseURL).set("Authorization", token)
    const userId = userUpdate.body[0].id

    const response = await request(app).patch(`${baseURL}/${userId}`).set("Authorization",token).send(mockedUpdate)

    const userUpdated = await request(app).get(baseURL).set("Authorization", token)

    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual("usuarioTesteUpdate")
    expect(userUpdated.body[0].email).toEqual("petmatch@mail.com")
    expect(userUpdated.body[0].password).toEqual("123456")
    expect(userUpdated.body[0].phone).toEqual("21971717171")
    expect(userUpdated.body[0].avatar).toEqual("img")
    
    expect(userUpdated.body[0]).not.toHaveProperty("password")
})

test("PATCH /users/:id -  should not be able to update user without authentication", async()=>{
  const responseLogin = await request(app).post("/login").send(mockedUserLogin);
  const userUpdate = await request(app).get(baseURL).set("Authorization", `Bearer ${responseLogin.body.token}`)
  const response = await request(app).patch(`${baseURL}/${userUpdate.body[0].id}`)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(401)
  
})

test("PATCH /users/:id - should not be able to update user with invalid id", async ()=>{
  const responseLogin = await request(app).post("/login").send(mockedUserLogin);
  const token = `Bearer ${responseLogin.body.token}`
  
  const userUpdate = await request(app).get(baseURL).set("Authorization", token)
  const userId = userUpdate.body[0].id

  const response = await request(app).patch(`${baseURL}/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization",token).send(mockedUpdate)
  
  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(404)
})


test("PATCH /users/:id - should not be able to update another user without id permission",async () => {
  //se nao passar pode comentar ou deletar (fiz sem muita certeza)
  const newData = {isActive: false}
  const userLoginResponse = await request(app).post("/login").send(mockedUser);
  const segundLoginResponse = await request(app).post("/login").send(mockedSegundUser);

  const userToken = `Bearer ${userLoginResponse.body.token}`
  const segundToken = `Bearer ${segundLoginResponse.body.token}`
  
  const userUpdate = await request(app).get(baseURL).set("Authorization", segundToken)
  const userId = userUpdate.body[1].id
  // fazer o mesm logica porem usando id para comparar com outro usuario . 
  const response = await request(app).patch(`${baseURL}/${userId}`).set("Authorization",userToken).send(newData)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(401)
})

//Delete
test("DELETE /users/:id -  should not be able to delete user without authentication",async () => {
  const responseLogin = await request(app).post("/login").send(mockedUserLogin);
  const userDelete = await request(app).get(baseURL).set("Authorization", `Bearer ${responseLogin.body.token}`)

  const response = await request(app).delete(`${baseURL}/${userDelete.body[0].id}`)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(401)
       
})

test("DELETE /users/:id -  Must be able to soft delete user", async ()=>{
  await request(app).post(baseURL).send(mockedUser)

  const responseLogin = await request(app).post("/login").send(mockedUserLogin)
  const responseDelete = await request(app).get(baseURL).set("Authorization", `Bearer ${responseLogin.body.token}`)

  const response = await request(app).delete(`${baseURL}/${responseDelete.body[0].id}`).set("Authorization", `Bearer ${responseLogin.body.token}`)
  const findUser = await request(app).get(baseURL).set("Authorization", `Bearer ${responseLogin.body.token}`)

  expect(response.status).toBe(204)
  expect(findUser.body[0].isActive).toBe(false)

})

test("DELETE /users/:id -  shouldn't be able to delete user with isActive = false",async () => {
  await request(app).post(baseURL).send(mockedUser)

  const responseLogin = await request(app).post("/login").send(mockedUserLogin);
  const userDelete = await request(app).get(baseURL).set("Authorization", `Bearer ${responseLogin.body.token}`)

  const response = await request(app).delete(`${baseURL}/${userDelete.body[0].id}`).set("Authorization", `Bearer ${responseLogin.body.token}`)
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty("message")

})

test("DELETE -  should not be able to delete user with invalid id",async () => {
  await request(app).post('/users').send(mockedUser)

  const adminLoginResponse = await request(app).post("/login").send(mockedUserLogin);
  
  const response = await request(app).delete(`${baseURL}/9cbc3f2e-a6c8-49de-8b49-b4c04940c1ec`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty("message")

})

}); //end describe
