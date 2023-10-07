import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IBodyProps {
    nome: string;
    link: string;
    dias: number;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3),
            link: yup.string().url().required(),
            dias: yup.number().integer().moreThan(0).required(),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    return res.status(StatusCodes.CREATED).json(1);
};
