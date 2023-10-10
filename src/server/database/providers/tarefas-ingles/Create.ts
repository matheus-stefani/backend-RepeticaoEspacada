import { Knex } from "../../knex";
import { ITarefasIngles } from "../../models";
import { ETablesNames } from "../../ETablesNames";

export const create = async (
    tarefasIngles1: Omit<ITarefasIngles, "id">,
    tarefasIngles2: Omit<ITarefasIngles, "id">,
    tarefasIngles3: Omit<ITarefasIngles, "id">
): Promise<number[] | Error> => {
    let array: number[] = [];
    try {
        const result = await Knex(ETablesNames.tarefasIngles)
            .insert([tarefasIngles1, tarefasIngles2, tarefasIngles3])
            .returning("id");


        result.forEach((e) => {
            if (typeof e === "object") {
                array.push(e.id);
            } else if (typeof e === "number") {
                array.push(e);
            }
        });

        if (array.length === 3) {
            return array;
        }

        return new Error("Erro ao cadastrar os dados no banco");
    } catch (err) {
        console.log(err);
        return new Error("Erro ao cadastrar os dados no banco");
    }
};
