import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { ITarefasIngles } from "../../database/models";
import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";

interface IBodyProps extends Omit<ITarefasIngles, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3).max(155),
            link: yup.string().url().required().max(255),
            dias: yup.number().integer().moreThan(0).required(),
            diaAno: yup.number().integer().optional(),
        })
    ),
}));

interface ReqBody extends IBodyProps {
    dias2: number;
    dias3: number;
}

export const createReqValidation = validation((getSchema) => ({
    body: getSchema<{ dias2: number; dias3: number }>(
        yup.object().shape({
            dias2: yup.number().integer().moreThan(0).required(),
            dias3: yup.number().integer().moreThan(0).required(),
        })
    ),
}));

export const create = async (req: Request<{}, {}, ReqBody>, res: Response) => {
    const tarefaIngles1: IBodyProps = {nome: req.body.nome,link: req.body.link,dias: req.body.dias};
    const tarefaIngles2: IBodyProps = { ...tarefaIngles1, dias: req.body.dias2 };
    const tarefaIngles3: IBodyProps = { ...tarefaIngles1, dias: req.body.dias3 };
    const result = await ProvidersTarefasIngles.create(
        tarefaIngles1,
        tarefaIngles2,
        tarefaIngles3
    );

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
