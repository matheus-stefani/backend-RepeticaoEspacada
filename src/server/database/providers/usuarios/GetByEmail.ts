import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETablesNames.usuario)
            .select("*")
            .where("email", "=", email)
            .first();

        if (result) return result;

        return new Error("Erro ao buscar usuário pelo email");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao buscar usuário pelo email");
    }
};
