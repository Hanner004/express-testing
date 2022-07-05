import { Router } from "express";

import {
  createPacient,
  getPacients,
  getPacientById,
  updatePacientById,
  deletePacientById,
} from "./pacients.controllers.js";

const router = Router();

router.post("/create-pacient", createPacient);

router.get("/get-pacients", getPacients);

router.get("/get-pacient-by-id/:pacientId", getPacientById);

router.put("/update-pacient-by-id/:pacientId", updatePacientById);

router.delete("/delete-pacient-by-id/:pacientId", deletePacientById);

export default router;
