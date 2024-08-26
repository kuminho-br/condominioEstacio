import { useSQLiteContext} from "expo-sqlite"

// DEFINAÇÃO DE TIPOS PERSONALIZADOS
    // DEFINIÇÃO DO TYPE APARTAMENTO
export type ApDatabase = {
    NUMERO: number
    BLOCO: string
    ANDAR: number
    MORADOR_CPF: string
}
    // DEFINIÇÃO DO TYPE DA ID DO APARTAMENTO
export type chaveComposta = {
    numero: number
    bloco: string
    andar: number
}
    //
export type ApFetch = {
    NUMERO: number
    BLOCO: string
    ANDAR: number
    MORADOR_NOME: string
    MORADOR_CPF: string
}

// FUNÇÃO Q ACOMODA AS OPERAÇÕES DE BANCO, P EXPORTAÇÃO
export function apDAO(){
    const database = useSQLiteContext()

    // CADASTRA UM APARTAMENTO
    async function cadastrarAp(insertData: ApDatabase) {
        const query = await database.prepareAsync(
            "INSERT INTO AP (NUMERO, BLOCO, ANDAR, MORADOR_CPF) "+
            "VALUES ($numero, $bloco, $andar, $morador)"
        )
        try{
            const result = await query.executeAsync({
                $numero: insertData.NUMERO,
                $bloco: insertData.BLOCO,
                $andar: insertData.ANDAR,
                $morador: insertData.MORADOR_CPF
            })
            console.log("AP CADASTRADO COM SUCESSO")
        }
        catch(error){
            console.log(error)
        }
        finally{
            await query.finalizeAsync()
        }
    }
    // RECUPERA APS DE ACORDO COM OS FILTROS PASSADOS
    async function listarAps (filtro: ApDatabase): Promise<ApFetch[]> {
        let query = 'SELECT AP.NUMERO, AP.BLOCO, AP.ANDAR, AP.MORADOR_CPF, MORADOR.NOME AS MORADOR_NOME '+
            'FROM AP '+
            'LEFT JOIN MORADOR ON AP.MORADOR_CPF = MORADOR.CPF '+
            'WHERE 1=1'
        const params: any[] = []
        if (filtro.NUMERO){
            query += ' AND NUMERO LIKE ?'
            params.push(`%${filtro.NUMERO}%`)
        }
        if (filtro.BLOCO){
            query += ' AND BLOCO LIKE ?'
            params.push(`%${filtro.BLOCO}%`)
        }
        if (filtro.ANDAR){
            query += ' AND ANDAR LIKE ?'
            params.push(`%${filtro.ANDAR}%`)
        }
        if (filtro.MORADOR_CPF){
            query += ' AND MORADOR_CPF LIKE ?'
            params.push(`%${filtro.MORADOR_CPF}%`)
        }
        try{
            const todosAps = await database.getAllAsync<ApFetch>(query,params)    
            if (todosAps){
                return todosAps
            }
            else{
                console.log('A CONSULTA NÃO RETORNOU APARTAMENTOS')
            }
        }
        catch (error){
            console.log(error)
        }
    }
    // EXCLUI UM APARTAMENTO
    async function removerAp (chave: chaveComposta) {
        console.log('ANTES DE APAGAR REGISTRO')
        const query = await database.prepareAsync('DELETE FROM AP WHERE NUMERO=? AND BLOCO=? AND ANDAR=?')
        // QUERY TEMPORÁRIA P APAGAR REGISTROS NULL, DEPOIS É PRECISO IMPLEMENTAR VALIDAÇÕES
        // PARA IMPEDIR A INSERÇÃO DE DADOS NULL
        //const query = await database.prepareAsync('DELETE FROM AP WHERE NUMERO IS NULL OR BLOCO IS NULL OR ANDAR IS NULL')
        try{
            await query.executeAsync(chave.numero, chave.bloco, chave.andar)
            console.log('REGISTRO APAGADO')
        }
        catch(error){
            console.log(error)
        }
    }
    // ATUALIZA O MORADOR DO APARTAMENTO
    async function atualizarAp(chave: chaveComposta, novoMoradorCpf: string) {
        console.log("ANTES DE ATUALIZAR")
        const query = await database.prepareAsync('UPDATE AP SET MORADOR_CPF = ? WHERE NUMERO = ? AND BLOCO = ? AND ANDAR = ?')
        try{
            await query.executeAsync(novoMoradorCpf, chave.numero, chave.bloco, chave.andar)
            console.log('MORADOR ATUALIZADO COM SUCESSO')
        }
        catch(error){
            console.log(error)
            throw(error)

        }
    }

    // RETORNO DAS FUNCIONALIDADES
    return {cadastrarAp, listarAps, removerAp, atualizarAp}
}