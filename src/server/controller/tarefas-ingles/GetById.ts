import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
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
    return res.status(StatusCodes.OK).json({
        Dados: "Sem banco de dados",
        Id: `O id do usuário pesquisado é: ${req.params.id}`,
    });
};
