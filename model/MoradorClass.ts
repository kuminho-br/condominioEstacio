export class Morador{
    cpf: number
    nome: string
    telefone: number
    eMail: string

    constructor(cpf: number, nome: string, telefone: number, eMail: string){
        this.cpf = cpf
        this.nome = nome
        this.telefone = telefone
        this.eMail = eMail
    }
}
