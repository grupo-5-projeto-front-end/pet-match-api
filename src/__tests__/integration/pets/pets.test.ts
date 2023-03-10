import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockedPet, mockedUser, mockedUserLogin } from "../../mocks";

describe("/pets", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /pets - Should be able to create a pet", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .post("/pets")
      .send(mockedPet)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("breed");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("avatar");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("deletedAt");
  });

  test("POST /pets -  Should not be able to create pet without authentication", async () => {
    const response = await request(app).post("/pets").send(mockedPet);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /pets - Should be able to get all pets", async () => {
    const response = await request(app).get("/pets");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("GET /pets/:id - Should be able to get pet by id", async () => {
    const pets = await request(app).get("/pets");
    const petId = pets.body[0].id;

    const response = await request(app).get(`/pets/${petId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("breed");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("avatar");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("deletedAt");
  });

  test("GET /pets/user/:id - Should be able to get all pets of a user", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const user = await request(app).get("/users");
    const userId = user.body[0].id;

    const response = await request(app)
      .get(`/pets/user/${userId}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("avatar");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("pets");

    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("deletedAt");
  });

  test("PATCH /pets/:id - Should be able to update pet information", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);

    const pets = await request(app).get("/pets");
    const petId = pets.body[0].id;

    const response = await request(app)
      .patch(`/pets/${petId}`)
      .send({ name: "Novo nome" })
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("sex");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("breed");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("bio");
    expect(response.body).toHaveProperty("avatar");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("deletedAt");
    expect(response.body.name).toEqual("Novo nome");
  });

  test("DELETE /pets/:id - Should be able to soft delete a pet", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);

    const pets = await request(app).get("/pets");
    const petId = pets.body[0].id;

    const response = await request(app)
      .delete(`/pets/${petId}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(response.status).toBe(204);
  });
});
