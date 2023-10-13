import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasIngles } from "../../models";

export const UpdateById = async (
    tarefaIngles: Omit<ITarefasIngles, "id">,
    id: number
): Promise<void | Error> => {
    try {
        const result = await Knex(ETablesNames.tarefasIngles)
            .update(tarefaIngles)
            .where("id", "=", id);

        if (result > 0) return;
        return new Error("Erro ao atualizar registro");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao atualizar registro");
    }
};
