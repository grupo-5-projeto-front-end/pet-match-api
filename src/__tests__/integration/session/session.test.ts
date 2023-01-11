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
    //criar antes de logar
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Post/login: login with the user", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);
    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("should not be able to login with the user with incorrect email", async () => {
    const response = await request(app).post("/login").send({
      email: "testeIncorreteEmail@gmail.com",
      password: "123456",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "petmatch@mail.com",
      password: "123456789",
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

}); // end describe
