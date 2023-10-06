import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
    link: string;
    dias: number;
}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().integer().moreThan(0).required(),
        })
    ),
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().min(3).required(),
            link: yup.string().url().required(),
            dias: yup.number().integer().moreThan(0).required(),
        })
    ),
}));

export const updateById = async (
    req: Request<IParamsProps, {}, IBodyProps>,
    res: Response
) => {
    return res.status(StatusCodes.OK).json({
        Dados: "Sem banco de dados",
        Id: `O id do usuário atualizado: ${req.params.id}`,
        nome: `Nome da tarefa do usuário atualizado: ${req.body.nome}`,
        link: `Link da tarefa do usuário atualizado: ${req.body.link}`,
        dias: `Dias da tarefa do usuário atualizado: ${req.body.dias}`,
    });
};
