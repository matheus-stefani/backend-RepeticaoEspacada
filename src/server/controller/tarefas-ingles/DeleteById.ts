import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";

interface IParamsProps {
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().integer().moreThan(0).required(),
        })
    ),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    const result = await ProvidersTarefasIngles.deleteById(
        Number(req.params.id)
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
