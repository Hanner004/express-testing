import app from "../src/app";
import request from "supertest";

describe("POST /pacient", () => {

  test("should return with a status code 200", async () => {
    const response = await request(app).post("/pacient");
    expect(response.status).toBe(200);
  });

  test("should have a content-type: application/json", async () => {
    const response = await request(app).post("/pacient");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  const newPacient = {
    name: "Hanner",
    lastname: "De La Hoz",
    email: "pacient@info.com",
  };

  test("should return a new object with the information of the new patient", async () => {
    const response = await request(app).post("/pacient").send(newPacient);
    expect(response.body.data).toBeInstanceOf(Object);
  });

});

describe("GET /pacients", () => {

  test("should return with a status code 200", async () => {
    const response = await request(app).get("/pacients");
    expect(response.status).toBe(200);
  });

  test("should returns an array of patients in the data key", async () => {
    const response = await request(app).get("/pacients");
    expect(response.body.data).toBeInstanceOf(Array);
  });

});
