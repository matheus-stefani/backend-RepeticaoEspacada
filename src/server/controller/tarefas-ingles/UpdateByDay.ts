import { Request, Response } from "express";


import { StatusCodes } from "http-status-codes";

import { ProvidersTarefasIngles } from "../../database/providers/tarefas-ingles";

export const updateByDay = async (
    req: Request,
    res: Response
) => {

    const result1 = await ProvidersTarefasIngles.getAllRegisters();
    if(result1 instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: result1.message,
                    },
                });
    }
    
   const result = await ProvidersTarefasIngles.updateByDay(result1);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};
