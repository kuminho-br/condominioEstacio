import { useSQLiteContext} from "expo-sqlite"

export type MoradorDatabase = {
    CPF: string
    NOME: string
    TELEFONE: string
    EMAIL: string
}

export function moradorDAO(){
    const database = useSQLiteContext()

    //CADASTRA UM MORADOR
    async function cadastrarMorador(insertData: MoradorDatabase) {
        const query = await database.prepareAsync(
            "INSERT INTO MORADOR (CPF, NOME, TELEFONE, EMAIL) "+
            "VALUES ($cpf, $nome, $telefone, $email)"
        )
        try{
            await query.executeAsync({
                $cpf: insertData.CPF,
                $nome: insertData.NOME,
                $telefone: insertData.TELEFONE,
                $email: insertData.EMAIL
            })
            console.log("MORADOR CADASTRADO COM SUCESSO")
        }
        catch(error){
            console.log(error)
        }
        finally{
            await query.finalizeAsync()
        }
    }
    // 
    async function listarMoradores (filtro: MoradorDatabase) {
        let query = 'SELECT * FROM MORADOR WHERE 1=1'
        const params: any[] = []
        if (filtro.CPF){
            query += ' AND CPF LIKE ?'
            params.push(`%${filtro.CPF}%`)
        }
        if (filtro.NOME){
            query += ' AND NOME LIKE ?'
            params.push(`%${filtro.NOME}%`)
        }
        if (filtro.TELEFONE){
            query += ' AND TELEFONE LIKE ?'
            params.push(`%${filtro.TELEFONE}%`)
        }
        if (filtro.EMAIL){
            query += ' AND EMAIL LIKE ?'
            params.push(`%${filtro.EMAIL}%`)
        }
        try{
            const todosMoradores = await database.getAllAsync<MoradorDatabase>(query,params)    
            if (todosMoradores){
                console.log('LISTA DE MORADORES OBTIDA')
                return todosMoradores
            }
            else{
                console.log('A CONSULTA NÃO RETORNOU NENHUM MORADOR')
            }
        }
        catch (error){
            console.log(error)
        }
    }

    async function removerMorador (chave: string) {
        const query = await database.prepareAsync('DELETE FROM MORADOR WHERE CPF = ?')
        // QUERY TEMPORÁRIA P APAGAR REGISTROS NULL, DEPOIS É PRECISO IMPLEMENTAR VALIDAÇÕES
        // PARA IMPEDIR A INSERÇÃO DE DADOS NULL
        //const query = await database.prepareAsync('DELETE FROM MORADOR WHERE CPF IS NULL OR NOME IS NULL OR TELEFONE IS NULL OR EMAIL IS NULL')
        try{
            await query.executeAsync(chave)
            console.log('REGISTRO APAGADO')
        }
        catch(error){
            console.log(error)
        }
    }

    async function atualizarMorador(novosDados:MoradorDatabase) {
        const query = await database.prepareAsync('UPDATE MORADOR SET NOME = ?, TELEFONE = ?, EMAIL = ? WHERE CPF = ?')
        try{
            await query.executeAsync(novosDados.NOME, novosDados.TELEFONE, novosDados.EMAIL, novosDados.CPF)
            console.log('DADOS DOMORADOR ATUALIZADO COM SUCESSO')
        }
        catch(error){
            console.log(error)
            throw(error)

        }
    }

    return {cadastrarMorador, listarMoradores, removerMorador, atualizarMorador}
}