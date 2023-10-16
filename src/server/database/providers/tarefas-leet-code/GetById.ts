import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasLeetCode } from "../../models";

export const getById = async (
    id: number
): Promise<ITarefasLeetCode | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefasLeetCode)
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
