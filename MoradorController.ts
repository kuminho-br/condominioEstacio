import { moradorDAO } from "../model/MoradorDAO";
import { liberarTeclado, limparCampos } from './GenericController'

export default function MoradorController() {
    const moradorCRUD = moradorDAO()

    async function createMorador(items: Array<string>,setters: Array<React.Dispatch<React.SetStateAction<string>>>) {
        const [cpf, nome, telefone, email] = items
        await moradorCRUD.cadastrarMorador({
            CPF: cpf, NOME: nome, TELEFONE: telefone, EMAIL: email
        })
        liberarTeclado()
        limparCampos(setters)
    }

    async function listMoradorFiltered(items: Array<string>) {
        const [cpf, nome, telefone, email] = items
        const responseAllMoradores = await moradorCRUD.listarMoradores({
            CPF: cpf, NOME: nome, TELEFONE: telefone, EMAIL: email
        })
        return(responseAllMoradores)
    }

    async function deleteMorador (cpfRemover: string, setters: Array<React.Dispatch<React.SetStateAction<string>>>){
        await moradorCRUD.removerMorador(cpfRemover)
        limparCampos(setters)
    }

    async function updateMorador(items: Array<string>,setters: Array<React.Dispatch<React.SetStateAction<string>>>) {
        const [cpf, nome, telefone, email] = items = items
        await moradorCRUD.atualizarMorador({
            CPF: cpf, NOME: nome, TELEFONE: telefone, EMAIL: email
        })
        liberarTeclado()
        limparCampos(setters)
    }

    return {createMorador, listMoradorFiltered, deleteMorador, updateMorador}
}