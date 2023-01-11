import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedLogin, mockedComment } from "../../mocks/mockPetsTests";

describe("/comments", () => {
    let connection: DataSource;

    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => console.log(err));
    });
  
    afterAll(async ()=>{
      await connection.destroy()
    })

    test("POST /comments - Should be able to create a comment", async () => {

        const loginRes = await request(app).post("/login").send(mockedLogin);
        const user = await request(app).get("/users").set("Authorization", `Bearer ${loginRes.body.token}`)
        
        mockedComment.userId = user.body[0].id

        const response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${loginRes.body.token}`)
          .send(mockedComment);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("comment");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");

        
      });
    
    test("POST /comments - Should NOT be able to create a comment without authentication", async () => {
      const loginRes = await request(app).post("/login").send(mockedLogin);
      const user = await request(app).get("/users").set("Authorization", `Bearer ${loginRes.body.token}`)
      
      mockedComment.userId = user.body[0].id

        const response = await request(app)
          .post("/comments")
          .send(mockedComment);
    
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
      });


    test("GET /comments - Should be able to get all comments", async () => {
      const loginRes = await request(app).post("/login").send(mockedLogin);
      const user = await request(app).get("/users").set("Authorization", `Bearer ${loginRes.body.token}`)
      
      const userId = user.body[0].id

      const response = await request(app).get(`/comments/${userId}`).set("Authorization", `Bearer ${loginRes.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")

    })

    test("GET /comments - Should NOT be able to get all comments without authentication", async () => {
      const loginRes = await request(app).post("/login").send(mockedLogin);
      const user = await request(app).get("/users").set("Authorization", `Bearer ${loginRes.body.token}`)
      
      const userId = user.body[0].id

      const response = await request(app).get(`/comments/${userId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH /comments - Should be able to update a comment", async () => {
        const loginRes = await request(app).post("/login").send(mockedLogin);
        const comments = await request(app).get("/comments")
        const commentId = comments.body[0].id
        
     
        const response = await request(app)
          .patch(`/comments/${commentId}`)
          .set("Authorization", `Bearer ${loginRes.body.token}`)
          .send({comment: "este comentário foi atualizado"});
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("comment");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
    })

    test("PATCH /comments - Should NOT be able to update a comment without authentication", async () => {
      const loginRes = await request(app).post("/login").send(mockedLogin);
      const comments = await request(app).get("/comments")
      const commentId = comments.body[0].id
      
   
      const response = await request(app)
        .patch(`/comments/${commentId}`)
        .send({comment: "este comentário foi atualizado"});
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
     
  })


  test("PATCH /comments - Should NOT be able to update a comment without a valid ID", async () => {
    const loginRes = await request(app).post("/login").send(mockedLogin);
    
    
    
 
    const response = await request(app)
      .patch(`/comments/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({comment: "este comentário foi atualizado"});

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
   
})

  

  test("DELETE /comments - Should be able to delete a comment", async () => {
    const loginRes = await request(app).post("/login").send(mockedLogin);
    const comments = await request(app).get("/comments")
    const commentId = comments.body[0].id
    
 
    const response = await request(app)
      .delete(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      

    expect(response.status).toBe(204);
   

  })

  test("DELETE /comments - Should NOT be able to delete a comment without authentication", async () => {
    const loginRes = await request(app).post("/login").send(mockedLogin);
    const comments = await request(app).get("/comments")
    const commentId = comments.body[0].id
    
 
    const response = await request(app)
      .delete(`/comments/${commentId}`)
            

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message")
   

  })

  test("DELETE /comments - Should NOT be able to delete a comment without a valid ID", async () => {
    const loginRes = await request(app).post("/login").send(mockedLogin);
    
    
    const response = await request(app)
    .delete(`/comments/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
    .set("Authorization", `Bearer ${loginRes.body.token}`)
            

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message")
   

  })


})