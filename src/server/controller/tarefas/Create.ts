import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ITarefasIngles {
    nome: string;
    link: string;
    dias: number;
}

interface IQueryIngles {
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ITarefasIngles>(
        yup.object().shape({
            nome: yup.string().required().min(3),
            link: yup.string().url().required(),
            dias: yup.number().integer().positive().required(),
        })
    ),

    query: getSchema<IQueryIngles>(
        yup.object().shape({
            filter: yup.string().optional().min(3),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, ITarefasIngles>,
    res: Response
) => {
    return res.status(StatusCodes.CREATED).json({
        nome: `O nome da tarefa foi cadastrado: ${req.body.nome}`,
        link: `O link da sua tarefa foi cadastrado: ${req.body.link}`,
        dias: `A quantidade de dias foi cadastrado: ${req.body.dias}`,
    });
};
