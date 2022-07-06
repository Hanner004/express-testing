import * as uuid from "uuid";

const pacients = [];

export const createPacient = async (req, res) => {
  
  const { name, lastname, email } = req.body;

  const pacient = {
    id: uuid.v4(),
    name,
    lastname,
    email,
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

  return await res.status(201).json({
    statusCode: 201,
    message: "pacient created",
    data: pacient,
  });

};

export const getPacients = async (req, res) => {
  return await res.status(200).json({
    statusCode: 200,
    message: "pacients found",
    data: pacients,
  });
};

export const getPacientById = async (req, res) => {

  const { pacientId } = req.params;

  const pacient = pacients.find((pacient) => pacient.id === pacientId);

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

};

export const updatePacientById = async (req, res) => {

  const { pacientId } = req.params;
  const { name, lastname, email } = req.body;

  const pacient = pacients.find((pacient) => pacient.id === pacientId);

  if (pacient) {
    pacient.name = name;
    pacient.lastname = lastname;
    pacient.email = email;
    return await res.status(200).json({
      statusCode: 200,
      message: "pacient updated",
      data: pacient,
    });
  } else {
    return await res.status(404).json({
      statusCode: 404,
      message: "pacient not found",
    });
  }

};

export const deletePacientById = async (req, res) => {

  const { pacientId } = req.params;

  const pacient = pacients.find((pacient) => pacient.id === pacientId);

  if (pacient) {
    pacients.splice(pacients.indexOf(pacient), 1);
    return await res.status(200).json({
      statusCode: 200,
      message: "pacient deleted",
    });
  } else {
    return await res.status(404).json({
      statusCode: 404,
      message: "pacient not found",
    });
  }

};
