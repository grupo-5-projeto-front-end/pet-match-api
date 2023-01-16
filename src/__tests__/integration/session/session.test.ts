import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedUser, mockedUserLogin } from "../../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => connection = res)
      .catch((err) => console.log(err));
    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);
    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("POST /login - Should not be able to login with an incorrect email", async () => {
    const response = await request(app).post("/login").send({
      email: "testeIncorreteEmail@gmail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /login - Should not be able to login with an incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "petmatch@mail.com",
      password: "123456789",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

});
