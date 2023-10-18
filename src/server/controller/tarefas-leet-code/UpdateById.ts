import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ITarefasLeetCode } from "../../database/models";
import { ProvidersTarefasLeetCode } from "../../database/providers/tarefas-leet-code";

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ITarefasLeetCode, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().integer().moreThan(0).required(),
        })
    ),
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().min(3).required(),
            link1: yup.string().url().required(),
            link2: yup.string().url().required(),
            desc: yup.string().required().min(5),
            dias: yup.number().integer().moreThan(0).required(),
            diaAno: yup.number().integer().optional(),
        })
    ),
}));

export const updateById = async (
    req: Request<IParamsProps, {}, IBodyProps>,
    res: Response
) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "Informe o parâmetro id",
            },
        });
    }
    const result = await ProvidersTarefasLeetCode.UpdateById(
        req.body,
        req.params.id
    );
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};
