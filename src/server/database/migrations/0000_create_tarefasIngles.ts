import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ETablesNames.tarefasIngles, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome", 150).index().notNullable();
            table.string("link", 255).index().notNullable();
            table.integer("dias").index().notNullable();
            table.comment(
                "Tabela usada para armazenar tarefas-ingles no sistema"
            );
        })
        .then(() => {
            console.log(`# Created table ${ETablesNames.tarefasIngles}`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETablesNames.tarefasIngles).then(() => {
        console.log(`# Dropped table ${ETablesNames.tarefasIngles}`);
    });
}
