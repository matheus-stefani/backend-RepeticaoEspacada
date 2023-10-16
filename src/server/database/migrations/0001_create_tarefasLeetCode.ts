import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";
import { FunctionsProviders } from "../providers/functions";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ETablesNames.tarefasLeetCode, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome").checkLength("<=", 155).index().notNullable();
            table.string("link1").checkLength("<=", 255).index().notNullable();
            table.string("link2").checkLength("<=", 255).index().notNullable();
            table.string("desc").checkLength("<=", 255).index().notNullable();
            table.integer("dias").index().notNullable();
            table
                .integer("diaAno")
                .defaultTo(FunctionsProviders.diaAno())
                .notNullable()
                .index();
            table.comment(
                "Tabela usada para armazenar tarefas-leet-code no sistema"
            );
        })
        .then(() => {
            console.log(`# Created table ${ETablesNames.tarefasLeetCode}`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETablesNames.tarefasLeetCode).then(() => {
        console.log(`# Dropped table ${ETablesNames.tarefasLeetCode}`);
    });
}
