import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { ProvidersTarefasLeetCode } from "../../database/providers/tarefas-leet-code";
interface IQueryProps {
    filter?: string;
    limit?: number;
    page?: number;
    id?: number;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            filter: yup.string().optional().default(""),
            limit: yup.number().integer().moreThan(0).optional(),
            page: yup.number().integer().moreThan(0).optional(),
            id: yup.number().integer().default(0).optional(),
        })
    ),
}));

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {
    const result = await ProvidersTarefasLeetCode.getAll(
        req.query.page || 1,
        req.query.limit || 7,
        req.query.filter || "",
        Number(req.query.id)
    );

    const count = await ProvidersTarefasLeetCode.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            },
        });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    return res.status(StatusCodes.OK).json(result);
};
