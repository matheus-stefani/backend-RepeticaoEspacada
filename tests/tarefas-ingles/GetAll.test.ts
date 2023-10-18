import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Tarefas-Ingles - GetAll", () => {
    it("Busca por registros com sucesso", async () => {
        const result = await testServer.post("/tarefas-ingles").send({
            nome: "Still Loving You",
            link: "https://www.letras.mus.br/scorpions/35388/traducao.html",
            dias: 5,
            dias2: 7,
            dias3: 9,
        });

        const busca = await testServer.get("/tarefas-ingles").send();

        const [obj] = busca.body;
        expect(busca.statusCode).toEqual(StatusCodes.OK);
        expect(obj).toHaveProperty("id");
        expect(obj).toHaveProperty("nome");
        expect(obj).toHaveProperty("link");
        expect(obj).toHaveProperty("dias");
        expect(obj).toHaveProperty("diaAno");
    });
});
