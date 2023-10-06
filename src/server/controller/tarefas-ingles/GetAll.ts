import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
interface IQueryProps {
    filter?: string;
    limit?: number;
    page?: number;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            filter: yup.string().optional(),
            limit: yup.number().integer().moreThan(0).optional(),
            page: yup.number().integer().moreThan(0).optional(),
        })
    ),
}));

export const getAll = async(
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {
    return res.status(StatusCodes.OK).json({
        Dados: "Sem banco de dados",
        Filter: `Dados do filter: ${req.query.filter}`,
        Limit: `Dados do limit: ${req.query.limit}`,
        Page: `Dados do page: ${req.query.page}`,
    });
};
