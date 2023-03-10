import {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import baseStyles from '../styles/BaseStyles'


const Input = ({icon, placeholder, text, setText, error, ...props}) => {
    // The user has attempted to input something
    const [dirty, setDirty] = useState(false);
    return (
        <View style={{marginBottom: 20}}>
            <View style={styles.textContainerStyle}>
                {icon}
                <TextInput style={[
                    baseStyles.baseText,
                    styles.textInput,
                    {color: text && text.length !== 0 ? '#000' : '#c0c0c0'}
                ]} placeholder={placeholder}
                    defaultValue={text}
                    onChangeText={setText}
                    onBlur={() => setDirty(true)}
                    {...props} />
            </View>
            {dirty && error ?
                    <Text style={[baseStyles.baseText, styles.errorText]}>{error}</Text>
                    : null
                }
        </View>
    )
}

const styles = StyleSheet.create({
    textContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1, //0.5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        borderColor: '#c0c0c0',
        height: '100%',
        width: '100%',
        //borderRadius: 5,
    },
    imageStyle: {
        flex: 1,
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    textInput: {
        flex: 2,
        height: 40
    },
    errorText: {
        color: 'red',
        fontSize: 'small',
        fontWeight: 'bold'
    }
})

export default Input