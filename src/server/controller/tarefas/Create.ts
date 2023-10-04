import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ITarefas {
    nome: string;
    link: string;
    dias: number;
}

const bodyValidation: yup.ObjectSchema<ITarefas> = yup.object().shape({
    nome: yup.string().required().min(3),
    link: yup.string().url().required(),
    dias: yup.number().integer().positive().required(),
});

export const create = async (req: Request<{}, {}, ITarefas>, res: Response) => {
    let validatedData: ITarefas | undefined = undefined;
    try {
        validatedData = await bodyValidation.validate(req.body);
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: yupError.message,
            },
        });
    }

    if (!validatedData) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "Erro na validação dos dados!",
            },
        });
    }

    return res.status(StatusCodes.CREATED).json({
        nome: `O nome da tarefa foi cadastrado: ${validatedData.nome}`,
        link: `O link da sua tarefa foi cadastrado: ${validatedData.link}`,
        dias: `A quantidade de dias foi cadastrado: ${validatedData.dias}`,
    });
};
