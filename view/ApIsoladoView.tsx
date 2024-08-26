import { Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native"
import {styles} from '../CommonStyles'
import { liberarTeclado } from "../controller/GenericController";
import ApController from '../controller/ApController';
import MoradorController from "../controller/MoradorController";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Picker } from "@react-native-picker/picker"
import React from "react";

export default function ApIsoladoView({route, navigation}){
    const {item} = route.params
    console.log('route_params: ', route.params)
    console.log('item: ', item)
    console.log('moradorCPF: ', item.MORADOR_CPF)
    const [numero, setNumero] = useState(item.NUMERO)
    const [bloco, setBloco] =useState(item.BLOCO)
    const [andar, setAndar] = useState(item.ANDAR)
    const [moradorNome, setMoradorNome] = useState(item.MORADOR_NOME)
    const [moradorCpf, setMoradorCpf] = useState(item.MORADOR_CPF)
    const [moradores, setMoradores] = useState([])
    const apController = ApController()
    const moradorController = MoradorController()
    console.log('Valor de moradorNome: ', moradorNome)
    console.log('Valor de moradorCpf: ', moradorCpf)

    const handleUpdate = () => {
        apController.updateAp(
            [numero, bloco, andar, moradorCpf],
            [])
        Alert.alert('Morador atualizado com sucesso \n Novo morador: ', moradorNome)
    }

    async function fetchMoradores() {
        const responseAll = await moradorController.listMoradorFiltered([]); 
        const responseFiltered = responseAll.map(morador => ({
                CPF: morador.CPF,
                NOME: morador.NOME
            }));
        setMoradores(responseFiltered)
        // ATUALIZA O NOME DO MORADOR COM BASE NO CPF ATUAL
        console.log('ResponseFiltered: ', responseFiltered)
        const moradorAtual = responseFiltered.find(morador => morador.CPF == String(moradorCpf));
        console.log('moradorAtual: ', moradorAtual)
        if (moradorAtual) {
            setMoradorNome(moradorAtual.NOME);
        } else {
            setMoradorNome('Selecione um morador');
        }
     } 

    useEffect(
        () => {fetchMoradores()},
        []
    )

    // FAZ COM QUE A FLATLIST DE APS SEJA ATUALIZADA, QND O USER RETORNA P ESSA TELA
    useFocusEffect(
            React.useCallback(() => {
                fetchMoradores()
            }, [numero, bloco, andar, moradorCpf])
        )
    

    return(
        <KeyboardAvoidingView behavior="height">
            <View
                style={[styles.container, { flexDirection: 'row' }, {flexWrap: 'wrap'}]} 
                onStartShouldSetResponder={() => true}
                onResponderRelease={liberarTeclado}>
                <Text style={styles.textItem}>Altere os valores que deseja atualizar:{'\n'}</Text>
                <TextInput style={styles.input}
                    placeholder='Número'
                    value={numero}
                    onChangeText = {setNumero}
                    editable = {false}
                />
                <TextInput style={styles.input}
                    placeholder = 'Bloco'
                    value={bloco}
                    onChangeText={setBloco}
                    editable = {false}
                />
                <TextInput style={styles.input}
                    placeholder = 'Andar'
                    value={andar.toString()}
                    onChangeText={setAndar}
                    editable = {false}
                />
                <Picker
                    style={styles.input}
                    selectedValue={moradorCpf}
                    onValueChange={(itemValue,itemIndex) => {
                        setMoradorCpf(itemValue)
                        const selectMorador = moradores.find(morador => morador.CPF == itemValue)
                        setMoradorNome(selectMorador ? selectMorador.NOME : moradorNome)
                    }}
                >    
                    <Picker.Item label={moradorNome} value={moradorNome}/>
                    {moradores.map((morador) => (
                        <Picker.Item key={morador.CPF} label={morador.NOME} value={morador.CPF}/>

                    ))}
                    
                </Picker>
                <TouchableOpacity
                    style={[{borderWidth: 1.5},{borderRadius: 8},{borderColor: '#152050'},
                        {alignSelf:'center'},{backgroundColor:'#bdbdbd'},{marginTop: 5}, {marginTop: 18},
                        {paddingBottom: 4},{paddingTop: 4},{opacity: 0.5}, {paddingHorizontal: 4}]}>
                    <AntDesign 
                        name="arrowright"
                        size={18}
                        color="#152050"
                        onPress={() => {
                            navigation.navigate('MoradorIsoladoView', moradorCpf)}
                        }
                    />
                </TouchableOpacity>
                <View style={[styles.container,{flexDirection: 'row'},{justifyContent: 'center'}]}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
