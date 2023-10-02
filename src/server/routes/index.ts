import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/listar", (_, res) => {
    return res.status(StatusCodes.OK).json({
        frase: "'Galera, proximo semestre programa de verdade!' by Clerivaldo since 2022",
    });
});

router.post("/listar", (req, res) => {
    return res.status(StatusCodes.OK).json({
        frase: `'Galera, proximo semestre programa de verdade!' by ${req.body.nome} since 2022`,
    });
});

export { router };
