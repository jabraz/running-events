import { RemoverUsuarioUseCase } from "../../usecases/removerUsuarioUseCase";
import { usuarioService } from "../../services/usuario.service";
import { atletaService } from "../../services/atleta.service";

jest.mock("../../models/Usuario");
jest.mock("../../services/usuario.service");
jest.mock("../../services/atleta.service");

describe("RemoverUsuarioUseCase", () => {
    const usuarioRemovidoMock = {
        message: "Usuário deletado com sucesso",
        usuarioRemovido: {
            _id: "68c6f43b6a7a22106e8e8479",
            nome: "admin",
            email: "admin@gmail.com",
            senha: "$2b$10$wILBN5VU34CPqbpO9jfaQezVDDUze2Zb.gT.9RyPt3e5RYcdw14yK",
            roles: ["admin"],
            __v: 0,
        },
    };

    const atletaVinculadoMock = {
        _id: "68c70ab377b9e22fe420df06",
        nome: "José Augusto Braz",
        sexo: "M",
        cpf: "123.456.789-00",
        email: "jose@email.com",
        telefone: "(11) 91234-5678",
        cidade: "São Paulo",
        equipe: "Corrida SP",
        tempoPrevisto: "00:45:00",
        dataNascimento: "1995-01-15T00:00:00.000Z",
        usuarioId: "68c70a9377b9e22fe420df00",
        inExcluido: false,
        criadoEm: "2025-09-14T18:34:27.454Z",
        __v: 0,
    };

    let removerUsuarioUseCase: RemoverUsuarioUseCase;

    beforeEach(() => {
        removerUsuarioUseCase = new RemoverUsuarioUseCase();
        jest.clearAllMocks();
    });

    describe("execute", () => {
        it("deve remover um usuário que não te atleta vinculado com sucesso", async () => {
            const dados = { id: "68c6f43b6a7a22106e8e8479" };

            (atletaService.buscarPorUsuarioId as jest.Mock).mockResolvedValue(null);

            (usuarioService.deletar as jest.Mock).mockResolvedValue(usuarioRemovidoMock);

            const resultado = await removerUsuarioUseCase.execute(dados);

            expect(usuarioService.deletar).toHaveBeenCalledWith(dados.id);
            expect(resultado).toEqual(usuarioRemovidoMock);
            expect(dados.id).toEqual(usuarioRemovidoMock.usuarioRemovido._id);
        });

        it("deve falhar ao tentar excluir um usuário que não existe", async () => {
            const dados = { id: "68c6f43b6a7a22106e8e8479" };

            (atletaService.buscarPorUsuarioId as jest.Mock).mockResolvedValue(null);

            (usuarioService.deletar as jest.Mock).mockResolvedValue(null);

            await expect(removerUsuarioUseCase.execute(dados)).rejects.toThrow(
                "Usuário não encontrado",
            );
        });

        it("deve falhar ao tentar excluir um usuário que está vinculado a um atleta", async () => {
            const dados = { id: "68c6f43b6a7a22106e8e8479" };

            (atletaService.buscarPorUsuarioId as jest.Mock).mockResolvedValue(atletaVinculadoMock);

            (usuarioService.deletar as jest.Mock).mockResolvedValue(null);

            await expect(removerUsuarioUseCase.execute(dados)).rejects.toThrow(
                `Este usuário está vinculado ao atleta ${atletaVinculadoMock._id} (${atletaVinculadoMock.nome})`,
            );
        });
    });
});
