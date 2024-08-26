import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create ({
    container: {
        marginLeft: 15, 
        marginTop: 10, 
        width: '90%', 
        gap: 5, 
        //justifyContent: 'center',
    },
    scrollContainer: {
        width: '90%'
    },
    itemsContainer: {
        marginTop: 10,
        padding: 5, 
        borderWidth: 2,
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        alignSelf: 'left', 
        backgroundColor: '#CECECE', 
        gap: 10,
        borderRadius: 5,
    },
    itemsText: {
        alignSelf: 'left',
    },
    itemsIcons: {
        alignSelf: 'right',
    },
    inputContainer: {
        flex: 1, 
        marginTop: 30, 
        marginLeft: '5%', 
        width: '90%', 
        padding: 20, 
        alignItems: 'stretch', 
        backgroundColor: '#fff'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse', 
        alignItems: 'flex-end', 
        borderBottomWidth: 1, 
        borderBottomColor: '#CCC', 
        paddingBottom: 10, 
        marginTop: 10
    },
    input: {
        marginTop:4, 
        height: 40, 
        backgroundColor: '#fff', 
        borderRadius: 7, 
        paddingHorizontal: 20, 
        fontSize: 16, 
        alignItems: 'stretch', 
        borderWidth: 1, 
        borderColor: '#999', 
        padding: 10,
        width: '80%'
    },
    button: {
        marginTop: 5, 
        marginBottom: 5, 
        height: 40, 
        backgroundColor: '#2AA5DE', 
        borderRadius: 10, 
        paddingHorizontal: 24, 
        fontSize: 16, 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 20, 
        shadowOpacity: 20, 
        shadowColor: '#ccc',
        width: '40%',
    },
    buttonText: {
        color: '#fff', 
        fontWeight: 'bold'
    },
    buttonTextBig: {
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 15
    },
    textItem: {
        fontSize: 18
    },
    deleteButton: { 
        marginLeft: 10, 
        height: 40, 
        width: 40, 
        backgroundColor: 'red', 
        borderRadius: 10, 
        padding: 10, 
        fontSize: 12, 
        elevation: 10, 
        shadowOpacity: 10, 
        shadowColor: '#ccc', 
        alignItems: 'center'
    },
    flatListContainer:{
        bottomPadding: 10,
        height: 330
    }
});