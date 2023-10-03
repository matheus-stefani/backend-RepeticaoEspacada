import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface ITarefasProps {
    nome: string;
    link: string;
    dias: number;
}

export const create = (req: Request<{}, {}, ITarefasProps>, res: Response) => {
    return res.status(StatusCodes.CREATED).json({
        nome: `O nome da tarefa foi cadastrado: ${req.body.nome}`,
        link: `O link da sua tarefa foi cadastrado: ${req.body.link}`,
        dias: `A quantidade de dias foi cadastrado: ${req.body.dias}`,
    });
};
