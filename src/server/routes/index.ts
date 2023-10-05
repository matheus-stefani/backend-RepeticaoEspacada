import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ControllerTarefas } from "../controller";

const router = Router();

router.get("/tarefas", (_, res) => {
    return res.status(StatusCodes.OK).json({
        frase: "'Galera, proximo semestre programa de verdade!' by Clerivaldo since 2022",
    });
});

router.post("/tarefas-ingles", ControllerTarefas.createValidation,ControllerTarefas.create);

export { router };
