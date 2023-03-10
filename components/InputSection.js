import {StyleSheet, View, Text} from 'react-native'
import baseStyles from '../styles/BaseStyles'
import requiredAsterisk from '../assets/Required-asterisk.svg'
import { useState } from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

/**
 * 
 * @param helpText: the text that will be shown above the input field
 * @param helpSubText: optional extra help text
 * @param inputFields: all the fields that will be used for input in this section
 */
const InputSection = ({helpText, helpSubText, inputFields, required, validator}) => {
    return(
        <View styles={styles.inputSection}>
            <MainHelpText required={required} smallBottomMargin={helpSubText !== undefined}>{helpText}</MainHelpText>
            <SubHelpText>{helpSubText}</SubHelpText>
            {inputFields.map((inputField, i) => (
                inputField
                )) }
        </View>
    )
}

const MainHelpText = ({required, children, smallBottomMargin}) => {
    const marginBottom = smallBottomMargin ? 0 : 0;
    return(
        <View style={styles.mainHelpTextSection}>
            <Text style={[baseStyles.baseText, styles.mainHelpText, {marginBottom}]}>{children}</Text>
            {required === false ?
                null :
                <RequiredAsteriskSvg />
            }
        </View>
    )
}

const SubHelpText = ({children}) => {
    return children ? 
        <Text style={[baseStyles.baseText, styles.subHelpText]}>{children}</Text> 
        : null
}

const RequiredAsteriskSvg = () => {
    return(
         <Svg
    width={7}
    height={7}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#a)">
      <Path
        d="M6.125 3.792H4.2l1.37 1.37-.408.409L3.792 4.2v1.925h-.584V4.171l-1.37 1.37-.409-.408 1.313-1.341H.875v-.584H2.8l-1.37-1.37.407-.409L3.208 2.8V.875h.584v1.867L5.133 1.4l.409.438-1.371 1.37h1.954v.584Z"
        fill="#FF1717"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h7v7H0z" />
      </ClipPath>
    </Defs>
  </Svg>
    )
}

const styles = StyleSheet.create({
    inputSection: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    mainHelpTextSection: {
        flexDirection: 'row'
    },
    mainHelpText: {
        marginBottom: 10
    },
    subHelpText: {
        flex: 1,
        color: '#c0c0c0',
        marginBottom: 10
    }
})

export default InputSection