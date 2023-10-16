import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasLeetCode } from "../../models";

export const UpdateById = async (
    tarefasLeetCode: Omit<ITarefasLeetCode, "id">,
    id: number
): Promise<void | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefasLeetCode)
            .update(tarefasLeetCode)
            .where("id", "=", id);

        if (result > 0) return;
        return new Error("Erro ao atualizar registro");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao atualizar registro");
    }
};
