import { ETablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ITarefasIngles } from "../../models";



export const getAllRegisters = async(): Promise<ITarefasIngles[] | Error>=>{

    try{
        const result = await Knex(ETablesNames.tarefasIngles).select("*").orderBy("dias");

        if(result.length>0) return result;

        return new Error("Erro ao pegar todos os registros");
    }
    catch(err){
        console.log(err);
        return new Error("Erro ao pegar todos os registros");
    }
}