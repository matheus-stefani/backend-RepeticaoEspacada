import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - Create", () => {
    it("Cria registro com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        expect(result.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof result.body).toEqual("object");
    });

    it("Cria registro com os tres campos inválidos", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "We",
            link: "ww.letras.mus.br/dance-gavin-dance/we-own-the-night/traducao.html",
            dias: -1,
            dias2: 0,
            dias3: -15,
        });

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Deve ter pelo menos 3 caracteres"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link",
            "Deve ter um formato de URL válida"
        );
        expect(result.body).toHaveProperty(
            "errors.body.dias",
            "Deve ser maior que 0"
        );
    });

    it("Cria registro sem os tres campos", async () => {
        const result = await testServer.post("/tarefas-ingles").send({});

        expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(result.body).toHaveProperty(
            "errors.body.nome",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.link",
            "Este campo é obrigatório"
        );
        expect(result.body).toHaveProperty(
            "errors.body.dias",
            "Este campo é obrigatório"
        );
    });
});
