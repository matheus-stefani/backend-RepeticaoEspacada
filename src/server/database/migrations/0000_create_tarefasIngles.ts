import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";

export const diaAno = () => {
    const now: any = new Date();
    const start: any = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ETablesNames.tarefasIngles, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome").checkLength("<=", 155).index().notNullable();
            table.string("link").checkLength("<=", 255).index().notNullable();
            table.integer("dias").index().notNullable();
            table.integer("diaAno").defaultTo(diaAno()).notNullable().index();
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
