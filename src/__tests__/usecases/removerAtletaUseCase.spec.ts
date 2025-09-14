import { RemoverAtletaUseCase } from "../../usecases/removerAtletaUseCase";
import { atletaService } from "../../services/atleta.service";
import { inscricaoService } from "../../services/inscricao.service";

jest.mock("../../models/Usuario");
jest.mock("../../services/atleta.service");
jest.mock("../../services/inscricao.service");

describe("RemoverAtletaUseCase", () => {
    const atletaRemovidoMock = {
        message: "Atleta deletado com sucesso",
        atletaRemovido: {
            _id: "68c5e67f1ddb3267612a8d48",
            nome: "José Augusto Braz",
            sexo: "M",
            cpf: "123.456.789-00",
            email: "jose@email.com",
            telefone: "(11) 91234-5678",
            cidade: "São Paulo",
            equipe: "Corrida SP",
            tempoPrevisto: "00:45:00",
            dataNascimento: "1995-01-15T00:00:00.000Z",
            usuarioId: "68c0fbeaa19c2190cc9d3618",
            criadoEm: "2025-09-13T21:47:43.240Z",
            __v: 0,
        },
    };

    const inscricaoVinculadaMock = {
        _id: "68c714fe74c46ca2b8a0af08",
        atletaId: "68c70b3ec289ab456acdc546",
        eventoId: "68c714d274c46ca2b8a0aef9",
        categoria: "5K",
        inExcluido: false,
        criadoEm: "2025-09-14T19:18:22.429Z",
        __v: 0,
    };

    let removerAtletaUseCase: RemoverAtletaUseCase;

    beforeEach(() => {
        removerAtletaUseCase = new RemoverAtletaUseCase();
        jest.clearAllMocks();
    });

    describe("execute", () => {
        it("deve remover um atleta que não possui inscrições vinculadas com sucesso", async () => {
            const dados = { id: "68c5e67f1ddb3267612a8d48" };

            (inscricaoService.buscarPorAtletaId as jest.Mock).mockResolvedValue(null);

            (atletaService.deletar as jest.Mock).mockResolvedValue(atletaRemovidoMock);

            const resultado = await removerAtletaUseCase.execute(dados);

            expect(atletaService.deletar).toHaveBeenCalledWith(dados.id);
            expect(resultado).toEqual(atletaRemovidoMock);
            expect(dados.id).toEqual(atletaRemovidoMock.atletaRemovido._id);
        });

        it("deve falhar ao tentar excluir um atleta que não existe", async () => {
            const dados = { id: "68c5e67f1ddb3267612a8d48" };

            (inscricaoService.buscarPorAtletaId as jest.Mock).mockResolvedValue(null);

            (atletaService.deletar as jest.Mock).mockResolvedValue(null);

            await expect(removerAtletaUseCase.execute(dados)).rejects.toThrow(
                "Atleta não encontrado",
            );
        });

        it("deve falhar ao tentar excluir um atleta que possui inscrições vinculadas", async () => {
            const dados = { id: "68c5e67f1ddb3267612a8d48" };

            (inscricaoService.buscarPorAtletaId as jest.Mock).mockResolvedValue(
                inscricaoVinculadaMock,
            );

            (atletaService.deletar as jest.Mock).mockResolvedValue(null);

            await expect(removerAtletaUseCase.execute(dados)).rejects.toThrow(
                "Este atleta possui inscrições vinculadas",
            );
        });
    });
});
