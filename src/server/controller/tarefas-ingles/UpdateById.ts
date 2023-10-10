import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ITarefasIngles } from "../../database/models";
import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ITarefasIngles, "id"> {}

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

// interface ReqBody extends IBodyProps {
//     dias2: number;
//     dias3: number;
// }

// export const createReqValidation = validation((getSchema) => ({
//     body: getSchema<{ dias2: number; dias3: number }>(
//         yup.object().shape({
//             dias2: yup.number().integer().moreThan(0).required(),
//             dias3: yup.number().integer().moreThan(0).required(),
//         })
//     ),
// }));

export const updateById = async (
    req: Request<IParamsProps, {}, IBodyProps>,
    res: Response
) => {
    const result = await ProvidersTarefasIngles.UpdateById(
        req.body,
        Number(req.params.id)
    );
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};
