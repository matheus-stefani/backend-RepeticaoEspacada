import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ETablesNames.usuarios, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("nome").checkLength("<=", 155).notNullable();
            table
                .string("email")
                .unique()
                .checkLength(">", 5)
                .index()
                .notNullable();
            table.string("senha").checkLength("<=", 255).notNullable();
            table.comment("Tabela usada para armazenar usuários no sistema");
        })
        .then(() => {
            console.log(`# Created table ${ETablesNames.usuarios}`);
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETablesNames.usuarios).then(() => {
        console.log(`# Dropped table ${ETablesNames.usuarios}`);
    });
}
