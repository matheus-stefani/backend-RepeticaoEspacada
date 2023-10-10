import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasIngles } from "../../models";

export const getById = async (id: number): Promise<ITarefasIngles | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefasIngles)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) {
            return result;
        }

        return new Error("Erro ao buscar pelo id");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao buscar pelo id");
    }
};
