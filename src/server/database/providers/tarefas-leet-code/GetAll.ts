import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasLeetCode } from "../../models";

export const getAll = async (
    page: number,
    limit: number,
    filter: string,
    id = 0
): Promise<ITarefasLeetCode[] | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefasLeetCode)
            .select("*")
            .where("id", "=", id)
            .orWhere("nome", "like", `%${filter}%`)
            .offset((page - 1) * 10)
            .limit(limit)
            .orderBy("dias");

        if (id > 0 && result.every((e) => e.id !== id)) {
            const resultById = await Knex(ETablesNames.tarefasLeetCode)
                .select("*")
                .where("id", "=", id)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (err) {
        console.log(err);
        return new Error("Erro ao buscar dados no banco");
    }
};
