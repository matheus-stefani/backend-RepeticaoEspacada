import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { JWTService, validation } from "../../shared/middleware";
import { IUsuario } from "../../database/models";

import { ProvidersUsuarios } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            email: yup.string().email().required().min(5),
            senha: yup.string().required().min(6),
        })
    ),
}));

export const signIn = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const { email, senha } = req.body;

    const result = await ProvidersUsuarios.getByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha são inválidos",
            },
        });
    }
    const isTest = await PasswordCrypto.verifyPassword(senha, result.senha);
    if (!isTest) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email ou senha são inválidos",
            },
        });
    } else {
        const accessToken = JWTService.sign({ uid: result.id });

        if (accessToken === "JWT_SECRET_NOT_FOUND") {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: { default: "Erro ao gerar o token de acesso" },
            });
        }
        return res.status(StatusCodes.OK).json({ accessToken });
    }
};
