import React, { useState, useEffect } from "react"
import {Alert, View, TextInput, FlatList, Pressable, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {styles} from '../CommonStyles'
import { type ApFetch} from '../model/ApDAO'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { liberarTeclado, limparCampos } from '../controller/GenericController';
import ApController from '../controller/ApController';
import { Picker } from "@react-native-picker/picker"
import { useFocusEffect } from "@react-navigation/native"
import MoradorController from "../controller/MoradorController"

export default function ApsView({navigation}){
    // DECLARAÇÃO DE VARIÁVEIS
    const [numero, setNumero] = useState('')
    const [bloco, setBloco] =useState('')
    const [andar, setAndar] = useState('')
    const [moradorCpf, setMoradorCpf] = useState('')
    const [apList, setApList] = useState<ApFetch[]>([])
    const [moradores, setMoradores] = useState([])
    const apController = ApController()
    const moradorController = MoradorController()
    const myKeyExtractor = (item: ApFetch) => {
        return `${item.NUMERO}-${item.BLOCO}-${item.ANDAR}`
    }

    // FUNÇÕES LOCAIS
    // RECUPERA OS APS DO BD, DE ACORDO COM OS FILTROS, E OS FORNECE P A FLATLIST 
    async function handleListFiltered () {
        setApList(await apController.listApFiltered([numero, bloco, andar, moradorCpf]))
    }

    async function fetchMoradores() {
        const responseAll = await moradorController.listMoradorFiltered([]);
        
       const responseFiltered = responseAll.map(morador => ({
                CPF: morador.CPF,
                NOME: morador.NOME
            }));
        setMoradores(responseFiltered)
    }
    async function getMoradorCpf(numero, bloco, andar){
        return(await apController.listApFiltered([numero, bloco, andar]))
    }
    // CADASTRAR NOVOS APARTAMENTOS
    const handleCreateAp = () => {
        apController.createAp(
            [numero, bloco, andar, moradorCpf],
            [setNumero, setBloco, setAndar, setMoradorCpf])
        Alert.alert('Apartamento cadastrado com sucesso')
        handleListFiltered()
    }
    // IMPLEMENTA FILTROS, ATUALIZANDO O ESTADO DA FLATLIST C BASE NOS CAMPOS DO FORM
    useEffect(
        () => {handleListFiltered(), fetchMoradores()},
        [numero, bloco, andar, moradorCpf]
    )
    // IMPLEMENTA O PROMPT DE EXCLUSÃO DE APS
    async function confirmPrompt(item: ApFetch){
        liberarTeclado()
        Alert.alert(
            'Confirmação',
            'Ter certeza que deseja excluir o apartamento?',
                [
                    {text: 'Sim', onPress: () => handleDeleteAp(item)},
                    {text: 'Não', style: 'destructive'}
                ]
        )
    }
    // REMOVE APARTAMENTOS
    async function handleDeleteAp (apRemover: ApFetch){
        apController.deleteAp(
            [apRemover.NUMERO, apRemover.BLOCO, apRemover.ANDAR],
            [setNumero, setBloco, setAndar, setMoradorCpf])
        Alert.alert('Apartamento removido com sucesso')
        handleListFiltered()
    }
    // FAZ COM QUE A FLATLIST DE APS SEJA ATUALIZADA, QND O USER RETORNA P ESSA TELA
    useFocusEffect(
        React.useCallback(() => {
            handleListFiltered()
            fetchMoradores()
        }, [numero, bloco, andar, moradorCpf])
    )
    

    // RENDERIZAÇÕES
    return(
        <KeyboardAvoidingView behavior="height">
            <View
                style={styles.container} 
                onStartShouldSetResponder={() => true}
                onResponderRelease={liberarTeclado}>
                <TextInput style={styles.input}
                    placeholder='Número'
                    value={numero}
                    onChangeText = {setNumero}
                />
                <TextInput style={styles.input}
                    placeholder = 'Bloco'
                    value={bloco}
                    onChangeText={setBloco}
                />
                <TextInput style={styles.input}
                    placeholder = 'Andar'
                    value={andar}
                    onChangeText={setAndar}
                />
                <Picker
                    style={styles.input}
                    selectedValue={moradorCpf}
                    onValueChange={(itemValue,itemIndex) => setMoradorCpf(itemValue)}
                >    
                    <Picker.Item label="Selecione um morador..." value=""/>
                    {moradores.map((morador) => (
                        <Picker.Item key={morador.CPF} label={morador.NOME} value={morador.CPF}/>
                    ))}
                    
                </Picker>
                <View style={{flexDirection:"row",justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateAp}>
                        <Text style={styles.buttonTextBig}>Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => limparCampos([setNumero,setBloco,setAndar, setMoradorCpf])}>
                        <Text style={styles.buttonTextBig}>Limpar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style = {styles.flatListContainer}
                    data={apList}
                    keyExtractor={myKeyExtractor}
                    renderItem={({item}) =>
                        <Pressable style={styles.itemsContainer}>
                            <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
                                <Text style={styles.itemsText}>
                                    Apartamento: {item.NUMERO} - {item.BLOCO} | Andar: {item.ANDAR}
                                </Text>
                                <MaterialIcons 
                                    style={styles.itemsIcons}
                                    name="edit"
                                    size={20}
                                    onPress={() => {
                                        navigation.navigate('ApIsoladoView',{item})
                                    }}
                                    >    
                                </MaterialIcons>
                            </View>
                            <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
                                <Text>
                                    Morador: {item.MORADOR_NOME}
                                </Text>
                                    <TouchableOpacity onPress={() => confirmPrompt(item)}>
                                        <MaterialIcons name="delete" size={20}></MaterialIcons>
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
