import express from "express";
import {v4} from "uuid";

const app = express();

app.use(express.json());

const pacients = [];

app.post("/pacient", async (req, res) => {
  
  const pacient = {
    id: v4(),
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  for (const i of pacients) {
    if (i.email === pacient.email) {
      return await res.status(409).json({
        statusCode: 409,
        message: "email already exists",
      });
    }
  }

  pacients.push(pacient);

  return await res.status(200).json({
    statusCode: 200,
    message: "pacient created",
    data: pacient,
  });

});

app.get("/pacients", async (req, res) => {
  return await res.status(200).json({
    statusCode: 200,
    message: "pacients found",
    data: pacients,
  });
});

app.get("/pacient/:pacientId", async (req, res) => {

  const pacient = pacients.find(
    (pacient) => pacient.id === req.params.pacientId
  );

  if (pacient) {
    return await res.status(200).json({
      statusCode: 200,
      message: "pacient found",
      data: pacient,
    });
  } else {
    return await res.status(404).json({
      statusCode: 404,
      message: "pacient not found",
    });
  }

});

export default app;
