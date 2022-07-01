import request from "supertest";
import * as uuid from "uuid";
import app from "../src/app";

let pacientId;

describe("app", () => {
  describe("POST /pacient", () => {
    
    const newPacient = {
      id: uuid.v4(),
      name: "Hanner",
      lastname: "De La Hoz",
      email: "pacient@info.com",
    };

    test("should return a new pacient", async () => {
      await request(app)
        .post("/pacient")
        .send(newPacient)
        .expect(201)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body.data).toBeInstanceOf(Object);
          expect(res.body.data.id).toBeDefined();
          expect(res.body.data.name).toBeDefined();
          expect(res.body.data.lastname).toBeDefined();
          expect(res.body.data.email).toBeDefined();
          pacientId = res.body.data.id;
        });
    });
  });

  describe("GET /pacients", () => {
    test("should return pacients", async () => {
      await request(app)
        .get("/pacients")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body.data).toBeInstanceOf(Array);
          if (res.body.data.length > 0) {
            expect(res.body.data[0].id).toBeDefined();
            expect(res.body.data[0].name).toBeDefined();
            expect(res.body.data[0].lastname).toBeDefined();
            expect(res.body.data[0].email).toBeDefined();
          }
        });
    });
  });

  describe("GET /pacient/:pacientId", () => {
    test("should return a pacient", async () => {
      await request(app)
        .get(`/pacient/${pacientId}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body.data).toBeInstanceOf(Object);
          expect(res.body.data.id).toBeDefined();
          expect(res.body.data.name).toBeDefined();
          expect(res.body.data.lastname).toBeDefined();
          expect(res.body.data.email).toBeDefined();
        });
    });
  });

  describe("PUT /pacient/:pacientId", () => {
    test("should update a pacient", async () => {

      const pacientToSave = {
        name: "Hanner",
        lastname: "De La Hoz",
        email: "hanner@info.com",
      };

      await request(app)
        .put(`/pacient/${pacientId}`)
        .send(pacientToSave)
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body.data).toBeInstanceOf(Object);
          expect(res.body.data.id).toBeDefined();
          expect(res.body.data.name).toBeDefined();
          expect(res.body.data.lastname).toBeDefined();
          expect(res.body.data.email).toBeDefined();
        });
    });
  });

  describe("DELETE /pacient/:pacientId", () => {
    test("should delete a pacient", async () => {
      await request(app).delete(`/pacient/${pacientId}`).expect(200);
    });
  });
});
