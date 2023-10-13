import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";
import { ITarefasIngles } from "../models";

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETablesNames.tarefasIngles).count<
        [{ count: number }]
    >("* as count");
    if (!Number.isInteger(count) || Number(count) > 0) return;
    await knex(ETablesNames.tarefasIngles).insert(tarefasInglesToInsert);
};

const tarefasInglesToInsert = [
    {
        nome: "We Own The Night",
        link: "https://www.letras.mus.br/dance-gavin-dance/we-own-the-night/traducao.html",
        dias: 9,
    },
    {
        nome: "We Own The Night",
        link: "https://www.letras.mus.br/dance-gavin-dance/we-own-the-night/traducao.html",
        dias: 15,
    },
    {
        nome: "We Own The Night",
        link: "https://www.letras.mus.br/dance-gavin-dance/we-own-the-night/traducao.html",
        dias: 19,
    },
    {
        nome: "Inpired the Liars",
        link: "https://www.letras.mus.br/dance-gavin-dance/inspire-the-liars/traducao.html",
        dias: 5,
    },
    {
        nome: "Inspired the Liars",
        link: "https://www.letras.mus.br/dance-gavin-dance/inspire-the-liars/traducao.html",
        dias: 7,
    },
    {
        nome: "Inpired the Liars",
        link: "https://www.letras.mus.br/dance-gavin-dance/inspire-the-liars/traducao.html",
        dias: 10,
    },
    {
        nome: "Man of the year",
        link: "https://www.letras.mus.br/dance-gavin-dance/man-of-the-year/traducao.html",
        dias: 2,
    },
    {
        nome: "Man of the year",
        link: "https://www.letras.mus.br/dance-gavin-dance/man-of-the-year/traducao.html",
        dias: 6,
    },
    {
        nome: "Man of the year",
        link: "https://www.letras.mus.br/dance-gavin-dance/man-of-the-year/traducao.html",
        dias: 5,
    },
];
