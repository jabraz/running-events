import { RegistrarAtletaUseCase } from "../../usecases/registrarAtletaUseCase";
import Atleta from "../../models/Atleta";
import Usuario from "../../models/Usuario";
import { atletaService } from "../../services/atleta.service";

jest.mock("../../models/Usuario");
jest.mock("../../models/Atleta");
jest.mock("../../services/atleta.service");

describe("RegistrarAtletaUseCase", () => {
    const atletaBodyMock = {
        nome: "José Augusto Braz",
        sexo: "M",
        cpf: "123.456.789-00",
        email: "jose@email.com",
        telefone: "(11) 91234-5678",
        cidade: "São Paulo",
        equipe: "Corrida SP",
        tempoPrevisto: "00:45:00",
        dataNascimento: "1995-01-15",
        usuarioId: "68c0fbeaa19c2190cc9d3618",
    };

    let registrarAtletaUseCase: RegistrarAtletaUseCase;

    beforeEach(() => {
        registrarAtletaUseCase = new RegistrarAtletaUseCase();
        jest.clearAllMocks();
    });

    describe("execute", () => {
        it("deve criar um atleta quando o usuário existe e não há atleta duplicado", async () => {
            const mockUsuario = { id: "68c0fbeaa19c2190cc9d3618" };

            (Usuario.findById as jest.Mock).mockResolvedValue(mockUsuario);
            (Atleta.findOne as jest.Mock).mockResolvedValue(null);

            (atletaService.criar as jest.Mock).mockResolvedValue({
                ...atletaBodyMock,
                _id: "68c5e67f1ddb3267612a8d48",
                __v: 0,
            });

            const resultado = await registrarAtletaUseCase.execute(atletaBodyMock);

            expect(Usuario.findById).toHaveBeenCalledWith(atletaBodyMock.usuarioId);
            expect(Atleta.findOne).toHaveBeenCalledWith({ usuarioId: atletaBodyMock.usuarioId });
            expect(atletaService.criar).toHaveBeenCalledWith(atletaBodyMock);
            expect(resultado.usuarioId).toBe(mockUsuario.id);
            expect(resultado.nome).toBe(atletaBodyMock.nome);
        });

        it("deve falhar caso não encontre o usuário vinculado ao atleta", async () => {
            (Usuario.findById as jest.Mock).mockResolvedValue(null);

            (Atleta.findOne as jest.Mock).mockResolvedValue(null);

            await expect(registrarAtletaUseCase.execute(atletaBodyMock)).rejects.toThrow(
                "Usuário vinculado não existe",
            );
        });

        it("deve falhar ao tentar cadastrar um atleta para um usuário que já possui atleta vinculado", async () => {
            (Usuario.findById as jest.Mock).mockResolvedValue({
                id: "68c0fbeaa19c2190cc9d3618",
                nome: "José",
            });

            (Atleta.findOne as jest.Mock).mockResolvedValue({ id: "68c22ae925433b4851459d6d" });

            await expect(registrarAtletaUseCase.execute(atletaBodyMock)).rejects.toThrow(
                "Já existe um atleta vinculado a este usuário",
            );
        });
    });
});
