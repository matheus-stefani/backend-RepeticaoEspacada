import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProvidersTarefasLeetCode } from "../../database/providers/tarefas-leet-code";

export const updateByDay = async (req: Request, res: Response) => {
    const result1 = await ProvidersTarefasLeetCode.getAllRegisters();
    if (result1 instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result1.message,
            },
        });
    }

    const result = await ProvidersTarefasLeetCode.updateByDay(result1);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};
