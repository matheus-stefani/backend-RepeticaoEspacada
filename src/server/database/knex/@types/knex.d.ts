import { ITarefasIngles, ITarefasLeetCode } from "../../models";

declare module "knex/types/tables" {
    interface Tables {
        tarefasIngles: ITarefasIngles;
        tarefasLeetCode: ITarefasLeetCode;
        //usuario: IUsuario
    }
}
