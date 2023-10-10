import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";
interface IQueryProps {
    filter?: string;
    limit?: number;
    page?: number;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            filter: yup.string().optional().default(""),
            limit: yup.number().integer().moreThan(0).optional(),
            page: yup.number().integer().moreThan(0).optional(),
        })
    ),
}));

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {
    
    const result = await ProvidersTarefasIngles.getAll(
        req.query.page,
        req.query.limit,
        req.query.filter
    );

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.OK).json(result);
};
