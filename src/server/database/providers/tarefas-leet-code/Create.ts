import { Knex } from "../../knex";
import { ITarefasLeetCode } from "../../models";
import { ETablesNames } from "../../ETablesNames";

export const create = async (
    tarefasLeetCode1: Omit<ITarefasLeetCode, "id">,
    tarefasLeetCode2: Omit<ITarefasLeetCode, "id">,
    tarefasLeetCode3: Omit<ITarefasLeetCode, "id">
): Promise<number[] | Error> => {
    let array: number[] = [];
    try {
        const result = await Knex(ETablesNames.tarefasLeetCode)
            .insert([tarefasLeetCode1, tarefasLeetCode2, tarefasLeetCode3])
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
