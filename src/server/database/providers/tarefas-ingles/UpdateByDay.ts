import { ProvidersTarefasIngles } from ".";
import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { diaAno } from "../../migrations/0000_create_tarefasIngles";
import { ITarefasIngles } from "../../models";

export const updateByDay = async (
    tarefasIngles: ITarefasIngles[]
): Promise<void | Error> => {
    let result: number[];
    let pegar;
    try {
        const diaAnoAtual = diaAno();

        tarefasIngles.forEach(async (tarefasIngles) => {
            if (!tarefasIngles.diaAno) return;
            tarefasIngles.dias =
                tarefasIngles.dias - (diaAnoAtual - tarefasIngles.diaAno);
            if (tarefasIngles.dias < 0) {
                const deletar = await ProvidersTarefasIngles.deleteById(
                    tarefasIngles.id
                );

                if (deletar instanceof Error) {
                    return new Error("Erro ao deletar registro menor que 0");
                }
            } else {
                tarefasIngles.diaAno = diaAnoAtual;
                await Knex(ETablesNames.tarefasIngles)
                    .where("id", "=", tarefasIngles.id)
                    .update(tarefasIngles);
            }
        });

        return;
    } catch (err) {
        console.log(err);
        return new Error("Erro ao atualizar o dia do registro");
    }
};
