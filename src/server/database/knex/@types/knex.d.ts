import { ITarefasIngles } from "../../models";


declare module "knex/types/tables" {
    interface Tables {
        tarefasIngles: ITarefasIngles;
        //tarefaLeetCode: ITarefaLeetCode;
        //usuario: IUsuario
    }
}