import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
interface IParamsProps{
    id?: number;
}

export const deleteByIdValidation = validation((getSchema)=>({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().integer().moreThan(0).required(),
        })
    )
}))

export const deleteById = async (req: Request<IParamsProps>, res: Response)=>{

    return res.status(StatusCodes.OK).json({
        Dados: "Sem banco de dados",
        Id: `Id do delete: ${req.params.id}`
    })
}