import { Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Alert, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import {styles} from '../CommonStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { liberarTeclado } from '../controller/GenericController';
import MoradorController from "../controller/MoradorController";
import { MoradorDatabase } from "../model/MoradorDAO";
import { useFocusEffect } from '@react-navigation/native';
import React from "react";

export default function MoradoresView ({navigation}){
    const [cpf, setCpf] =useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [eMail, setEMail] = useState('')
    const moradorController = MoradorController()
    const [moradorList, setMoradorList] = useState<MoradorDatabase[]>([])
    
    const handleCreateMorador = () => {
        moradorController.createMorador(
            [cpf, nome, telefone, eMail],
            [setCpf, setNome, setTelefone, setEMail])
        Alert.alert('Morador cadastrado com sucesso')
        handleListFiltered()
    }
    async function handleListFiltered () {
        setMoradorList(await moradorController.listMoradorFiltered([cpf, nome, telefone, eMail]))
    }
    useEffect(
        () => {handleListFiltered()},
        [cpf, nome, telefone, eMail]
    )
    async function confirmPrompt(cpfRemover: string){
        liberarTeclado()
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esse morador?',
                [
                    {text: 'Sim', onPress: () => handleDeleteAp(cpfRemover)},
                    {text: 'Não', style: 'destructive'}
                ]
        )
    }
    async function handleDeleteAp (cpfRemover: string){
        moradorController.deleteMorador(
            cpfRemover,
            [setCpf, setNome, setTelefone, setEMail])
        Alert.alert('Morador removido com sucesso')
        handleListFiltered()
    }

    useFocusEffect(
        React.useCallback(() => {
            handleListFiltered();
        }, [])
    );



    return (
        <KeyboardAvoidingView behavior="height">
            <View
                style={styles.container} 
                onStartShouldSetResponder={() => true}
                onResponderRelease={liberarTeclado}>
                
                <TextInput style={styles.input}
                    placeholder='CPF'
                    value={cpf}
                    onChangeText = {setCpf}
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
                <View style={{flexDirection:"row",justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateMorador}>
                        <Text style={styles.buttonTextBig}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style = {styles.flatListContainer}
                    data={moradorList}
                    keyExtractor={(item) => String(item.CPF)}
                    renderItem={({item}) =>
                        <Pressable style={styles.itemsContainer}>
                            <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
                                <Text style={styles.itemsText}>
                                    Nome: {item.NOME} {'\n'} CPF: {item.CPF}
                                </Text>
                                <MaterialIcons 
                                    style={styles.itemsIcons}
                                    name="edit"
                                    size={20}
                                    onPress={() => {
                                        console.log('CPF antes de navegar: ', item.CPF)
                                        navigation.navigate('MoradorIsoladoView', item.CPF)
                                    }}
                                >    
                                </MaterialIcons>
                            </View>
                            <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
                                <Text>
                                    Telefone: {item.TELEFONE} {'\n'} E-mail: {item.EMAIL}
                                </Text>
                                    <TouchableOpacity>
                                        <MaterialIcons name="delete" size={20} onPress={() => confirmPrompt(String(item.CPF))}></MaterialIcons>
                                    </TouchableOpacity>
                            </View>                                
                        </Pressable>
                    }
                >
                </FlatList>
            </View>
        </KeyboardAvoidingView>
    )
}