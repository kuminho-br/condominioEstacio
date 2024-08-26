import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ApsView from './view/ApsView'
import ApIsoladoView from './view/ApIsoladoView';
import MoradoresView from './view/moradoresView';
import MoradorIsoladoView from './view/moradorIsoladoView';
import { SQLiteProvider} from "expo-sqlite";
import { criarTabela } from "./model/initializeDatabase";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function ApsStack () {
  return (
    <Stack.Navigator initialRouteName='ApsView'>
      <Stack.Screen
        name='ApsView'
        component={ApsView}
        options={{title: 'Apartamentos'}} 
      />
      <Stack.Screen
        name='ApIsoladoView'
        component={ApIsoladoView}
        options={{title: 'Detalhes do Apartamento'}} 
      />
      <Stack.Screen
        name='MoradorIsoladoView'
        component={MoradorIsoladoView}
        options={{title: 'Detalhes do Morador'}} 
      />
    </Stack.Navigator>
  )
}

function MoradoresStack() {
  return (
    <Stack.Navigator initialRouteName='MoradoresView'>
      <Stack.Screen
        name='MoradoresView'
        component={MoradoresView}
        options={{ title: 'Moradores' }}
      />
      <Stack.Screen
        name='MoradorIsoladoView'
        component={MoradorIsoladoView}
        options={{ title: 'Detalhes do Morador' }}
      />
    </Stack.Navigator>
  )
}

export default function App(){
  return(
    <SQLiteProvider databaseName="Condominio.db" onInit={criarTabela}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Apartamentos') {
                iconName = 'home';
              } else if (route.name === 'Moradores') {
                iconName = 'person';
              }

              return <MaterialIcons name={iconName} color={color} size={size} />;
            },
            tabBarActiveBackgroundColor: '#d2d2d2', // Cor de fundo da tab ativa
            tabBarInactiveBackgroundColor: '#fff', // Cor de fundo da tab inativa
            tabBarActiveTintColor: 'blue', // Cor do ícone/texto ativo
            tabBarInactiveTintColor: 'gray', // Cor do ícone/texto inativo
          })}
        >
          <Tab.Screen
            name='Apartamentos'
            component={ApsStack}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name='home' color={'blue'} size={30}></MaterialIcons>
              ),
              headerShown:false}}
          >
          </Tab.Screen>
          <Tab.Screen
            name='Moradores'
            component={MoradoresStack}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name='person' color={'blue'} size={30}></MaterialIcons>
              ),
              headerShown: false}}
          >
          </Tab.Screen>
        </Tab.Navigator>
        
      </NavigationContainer>
    </SQLiteProvider>
  )
}