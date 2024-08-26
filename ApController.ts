import { apDAO } from '../model/ApDAO'
import { liberarTeclado, limparCampos } from './GenericController'

export default function ApController(){
    const apCRUD = apDAO()   

    async function createAp(items: Array<string>,setters: Array<React.Dispatch<React.SetStateAction<string>>>) {
        const [numero, bloco, andar, morador] = items
        await apCRUD.cadastrarAp(
            {NUMERO: Number(numero), BLOCO: bloco, ANDAR: Number(andar), MORADOR_CPF: morador})
        liberarTeclado()
        limparCampos(setters)
    }

    async function listApFiltered(items: Array<string>) {
        const [numero, bloco, andar, moradorNome] = items
        const responseAllAps = await apCRUD.listarAps({
            NUMERO: Number(numero), BLOCO: bloco, ANDAR: Number(andar), MORADOR_CPF: moradorNome
        })
        return(responseAllAps)
    }

    async function updateAp(items: Array<string>,setters: Array<React.Dispatch<React.SetStateAction<string>>>) {
        const [numero, bloco, andar, morador] = items
        await apCRUD.atualizarAp(
            {numero: Number(numero), bloco: bloco, andar: Number(andar)},
            morador
        )
        liberarTeclado()
        limparCampos(setters)
    }
    
    async function deleteAp (apRemover: Array<any>,setters: Array<React.Dispatch<React.SetStateAction<string>>>){
        const [numero, bloco, andar] = apRemover
        await apCRUD.removerAp(
            {
                numero: Number(numero),
                bloco: bloco,
                andar: Number(andar)
            }
        )
        limparCampos(setters)
    }

    return {createAp, listApFiltered, updateAp, deleteAp}
}