import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { app } from "../../../app";
import { mockedPet, mockedUser, mockedUserLogin } from "../../mocks";

describe("/likes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    await request(app).post("/users").send(mockedUser);
    const login = await request(app).post("/login").send(mockedUserLogin);
    await request(app)
      .post("/pets")
      .send(mockedPet)
      .set("Authorization", `Bearer ${login.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /likes/:id - Should be able to create a like", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const pet = await request(app).get("/pets");

    const response = await request(app)
      .post(`/likes/${pet.body[0].id}`)
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
    expect(response.body).toHaveProperty("likes");
  });

  test("POST /likes/:id - Should't be able to create a like without a token", async () => {
    const pet = await request(app).get("/pets");

    const response = await request(app).post(`/likes/${pet.body[0].id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /likes/:id - Should't be able to create a like in the same pet", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const pet = await request(app).get("/pets");

    const response = await request(app)
      .post(`/likes/${pet.body[0].id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
