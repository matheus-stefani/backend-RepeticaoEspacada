import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";
interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().integer().moreThan(0).required(),
        })
    ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
    const result = await ProvidersTarefasIngles.getById(Number(req.params.id));

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.OK).json(result);
};
