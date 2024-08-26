import { Text, Alert, KeyboardAvoidingView, View, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import MoradorController from "../controller/MoradorController";
import {styles} from '../CommonStyles'
import { liberarTeclado } from "../controller/GenericController";

export default function MoradorIsoladoView ({route}) {
    console.log('Valor de Route.params: ', route.params)
    const [cpf, setCpf] =useState(route.params)
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [eMail, setEMail] = useState('')
    const moradorController = MoradorController()
    console.log('Valor do campo CPF: ', cpf)
    

    const handleUpdate = () => {
        moradorController.updateMorador(
            [cpf, nome, telefone, eMail],
            [])
        Alert.alert('Dados do morador atualizados com sucesso'/*,
            `\nNovos dados:
            \nNome: ${nome}
            \nTelefone: ${telefone}
            \nE-mail: ${eMail}`*/)
    }
    async function handleListMoradores () {
        const response = await moradorController.listMoradorFiltered([cpf])
        console.log('DADOS DO MORADOR OBTIDO: ', response)
        setCpf(response[0].CPF)
        setNome(response[0].NOME)
        setTelefone(response[0].TELEFONE)
        setEMail(response[0].EMAIL)
    }
    useEffect(
        () => {handleListMoradores()},
        []
    )




    return (
        <KeyboardAvoidingView behavior="height">
            <View
                style={styles.container} 
                onStartShouldSetResponder={() => true}
                onResponderRelease={liberarTeclado}>
                <Text style={styles.textItem}>Altere os valores que deseja atualizar:{'\n'}</Text>
                <TextInput style={styles.input}
                    placeholder='CPF'
                    value={String(cpf)}
                    onChangeText = {setCpf}
                    editable = {true}
                />
                <TextInput style={styles.input}
                    placeholder = 'Nome'
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput style={styles.input}
                    placeholder = 'Telefone'
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <TextInput style={styles.input}
                    placeholder = 'E-mail'
                    value={eMail}
                    onChangeText={setEMail}
                />


                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                                        <Text>Atualizar</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
        

    )
}
