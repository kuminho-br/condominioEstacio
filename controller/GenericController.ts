import { Keyboard } from "react-native"

// REMOVE O TECLADO DA TELA DO USER
export const liberarTeclado = () => {
    Keyboard.dismiss()
}
// LIMPA OS CAMPOS DO FORMULÁRIO, PASSANDO UM ARRAY DE SETTERS DE USESTATES
export const limparCampos = (setters: Array<React.Dispatch<React.SetStateAction<string>>>) => {
    setters.forEach(
        (setter => setter(''))
    )
}
