import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { ITarefasLeetCode } from "../../database/models";

import { ProvidersTarefasLeetCode } from "../../database/providers/tarefas-leet-code";

interface IBodyProps extends Omit<ITarefasLeetCode, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            nome: yup.string().required().min(3).max(155),
            link1: yup.string().url().required().max(255),
            link2: yup.string().url().required().max(255),
            desc: yup.string().required().max(255),
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
    const tarefaLeetCode1: IBodyProps = {
        nome: req.body.nome,
        link1: req.body.link1,
        link2: req.body.link2,
        desc: req.body.desc,
        dias: req.body.dias,
    };
    const tarefaLeetCode2: IBodyProps = {
        ...tarefaLeetCode1,
        dias: req.body.dias2,
    };
    const tarefaLeetCode3: IBodyProps = {
        ...tarefaLeetCode1,
        dias: req.body.dias3,
    };
    const result = await ProvidersTarefasLeetCode.create(
        tarefaLeetCode1,
        tarefaLeetCode2,
        tarefaLeetCode3
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
