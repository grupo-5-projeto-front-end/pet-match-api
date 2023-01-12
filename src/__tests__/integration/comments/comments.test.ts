import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedComment,
  mockedSegundLogin,
  mockedSegundUser,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/comments", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => console.log(err));

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedSegundUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /comments/id - Should be able to create a comment", async () => {
    const loginRes = await request(app).post("/login").send(mockedSegundLogin);
    const user = await request(app).get("/users");

    mockedComment.userId = user.body[0].id;

    const response = await request(app)
      .post(`/comments/${user.body[1].id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send(mockedComment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("comment");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("POST /comments/id - Should NOT be able to create a comment without authentication", async () => {
    const user = await request(app).get("/users");
    mockedComment.userId = user.body[0].id;

    const response = await request(app)
      .post(`/comments/${user.body[1].id}`)
      .send(mockedComment);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /comments/id - Should be able to get all comments on user", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const user = await request(app).get("/users");

    const userId = user.body[0].id;

    const response = await request(app)
      .get(`/comments/${userId}`)
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
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("deletedAt");
    expect(response.body).toHaveProperty("comments");
  });

  test("GET /comments - Should NOT be able to get all comments without authentication", async () => {
    const user = await request(app).get("/users");
    const userId = user.body[0].id;
    const response = await request(app).get(`/comments/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /comments - Should be able to update a comment", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const getuser = await request(app).get(`/users`);

    const comments = await request(app)
      .get(`/comments/${getuser.body[1].id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    console.log(comments.body);

    const commentId = comments.body.comments[0].id;
    const loginResSecond = await request(app)
      .post("/login")
      .send(mockedSegundLogin);

    const response = await request(app)
      .patch(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${loginResSecond.body.token}`)
      .send({ comment: "este comentário foi atualizado" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("comment");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("PATCH /comments - Should NOT be able to update a comment without authentication", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const getuser = await request(app).get(`/users`);

    const comments = await request(app)
      .get(`/comments/${getuser.body[1].id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    const commentId = comments.body.comments[0].id;

    const response = await request(app)
      .patch(`/comments/${commentId}`)
      .send({ comment: "este comentário nao foi atualizado" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /comments - Should NOT be able to update a comment without a valid ID", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .patch(`/comments/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({ comment: "este comentário não foi atualizado" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /comments - Should be able to delete a comment", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);
    const getuser = await request(app).get(`/users`);
    const comments = await request(app).get(`/comments/${getuser.body[1].id}`);
    const commentId = comments.body[0].id;

    const response = await request(app)
      .delete(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /comments - Should NOT be able to delete a comment without authentication", async () => {
    const getuser = await request(app).get(`/users`);
    const comments = await request(app).get(`/comments/${getuser.body[1].id}`);
    const commentId = comments.body[0].id;

    const response = await request(app).delete(`/comments/${commentId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /comments - Should NOT be able to delete a comment without a valid ID", async () => {
    const loginRes = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .delete(`/comments/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
