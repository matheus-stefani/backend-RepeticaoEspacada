import { ProvidersTarefasLeetCode } from ".";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasLeetCode } from "../../models";
import { FunctionsProviders } from "../functions";

export const updateByDay = async (
    tarefasLeetCode: ITarefasLeetCode[]
): Promise<void | Error> => {
    let result: number[];
    let pegar;
    try {
        const diaAnoAtual = FunctionsProviders.diaAno();

        tarefasLeetCode.forEach(async (tarefasLeetCode) => {
            if (!tarefasLeetCode.diaAno) return;
            tarefasLeetCode.dias =
                tarefasLeetCode.dias - (diaAnoAtual - tarefasLeetCode.diaAno);
            if (tarefasLeetCode.dias < 0) {
                const deletar = await ProvidersTarefasLeetCode.deleteById(
                    tarefasLeetCode.id
                );

                if (deletar instanceof Error) {
                    return new Error("Erro ao deletar registro menor que 0");
                }
            } else {
                tarefasLeetCode.diaAno = diaAnoAtual;
                await Knex(ETablesNames.tarefasLeetCode)
                    .where("id", "=", tarefasLeetCode.id)
                    .update(tarefasLeetCode);
            }
        });

        return;
    } catch (err) {
        console.log(err);
        return new Error("Erro ao atualizar o dia do registro");
    }
};
