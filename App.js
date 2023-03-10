import { StatusBar } from 'expo-status-bar'
import * as React from "react"
import { SvgProps, Path } from "react-native-svg"
import {useState, useCallback} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import * as yup from 'yup'
import Validation from 'string-format-validation'
import ArrowBack from './assets/arrow_back.svg'
import baseStyles from './styles/BaseStyles'
import InputSection from './components/InputSection'
import Input from './components/Input'
import nameIcon from './assets/Name-Icon.svg'
import emailIcon from './assets/Email-Icon.svg'
import phoneIcon from './assets/Phone-Icon.svg'
import passwordIcon from './assets/Password-Icon.svg'
import proceedIcon from './assets/Proceed-Icon.svg'
import Svg, {Image, SvgUri} from 'react-native-svg'
import { newValidator, email, done, required, equals, phoneNumber, min } from './Validators'
//import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

//SplashScreen.preventAutoHideAsync();

export default function App() {
  /*const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.ttf')
  })*/

  // const [dataLoaded, setDataLoaded] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    altPhoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const userDataValidators = {
    name: required(done()),
    email: required(email(done())),
    phoneNumber: required(phoneNumber(done())),
    altPhoneNumber: phoneNumber(done()),
    password: required(min(8, done())),
    confirmPassword: equals(done())
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        
        <Svg
          width={16}
          height={17}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M8 16.97 0 8.485 8 0l1.425 1.485-5.6 5.94H16v2.12H3.825l5.6 5.94L8 16.97Z"
            fill="#1C1B1F"
          />
    </Svg>

      </View>
      <ScrollView>
      <View style={styles.titleSection}>
          <Text style={[baseStyles.baseText, styles.mainTitleText]}>Create a rider account</Text>
          <Text style={baseStyles.baseText}>It'll only take a minute</Text>
      </View>
      <View style={styles.inputSection}>
        <InputSection
          helpText='What would you like us to call you?'
          inputFields={[
            <Input
              key={1}
              icon={<NameSvg />}
              placeholder='Name' text={userData.name}
              setText={(text) => setUserData({...userData, name: text})}
              error={userDataValidators.name(userData.name)} />
          ]}
          />
        <InputSection
          helpText='Your best Email'
          inputFields={[
            <Input
              key={1}
              icon={<EmailSvg />} placeholder='E.g yourname@gmail.com'
              text={userData.email}
              setText={(text) => setUserData({...userData, email: text})}
              error={userDataValidators.email(userData.email)} />
          ]}
          />
        <InputSection
          helpText="Your Phone Number (We'll send a verification code)"
          inputFields={[
            <Input
              key={1}
              icon={<PhoneSvg />} placeholder='+2340000004200'
              text={userData.phoneNumber}
              setText={(text) => setUserData({...userData, phoneNumber: text})}
              error={userDataValidators.phoneNumber(userData.phoneNumber)} />
          ]}
          />
        <InputSection
          helpText='An alternative phone number'
          helpSubText='To ensure we can absolutely reach you'
          required={false}
          inputFields={[
            <Input
              key={1}
              icon={<PhoneSvg />} placeholder='+2340000004200'
              text={userData.altPhoneNumber}
              setText={(text) => setUserData({...userData, altPhoneNumber: text})}
              error={userDataValidators.altPhoneNumber(userData.altPhoneNumber)}
              required={false} />
          ]}
          />
        <InputSection
          helpText='Secure your account'
          inputFields={[
            <Input
              key={1}
              icon={<PasswordSvg /> } placeholder='Create a password'
              text={userData.password}
              secureTextEntry={true}
              setText={(text) => setUserData({...userData, password: text})}
              error={userDataValidators.password(userData.password)} />,
            <Input
              key={2}
              icon={<PasswordSvg />} placeholder='Confirm password'
              text={userData.confirmPassword}
              secureTextEntry={true}
              setText={(text) => setUserData({...userData, confirmPassword: text})}
              error={userDataValidators.confirmPassword(userData.confirmPassword, userData.password)} />,
          ]}
          />
        <View style={styles.buttonSection}>
          <ProceedButton />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const NameSvg = () => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
        fill="#000"
      />
    </Svg>
  )
}

const PasswordSvg = () => {
  return(
     <Svg
    width={12}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.5 15a1.48 1.48 0 0 1-1.059-.42A1.344 1.344 0 0 1 0 13.572V6.43c0-.393.147-.73.441-1.01A1.48 1.48 0 0 1 1.5 5h.75V3.571c0-.988.366-1.83 1.097-2.527C4.078.348 4.963 0 6 0s1.922.348 2.653 1.044c.731.697 1.097 1.54 1.097 2.527V5h.75c.412 0 .766.14 1.06.42.293.28.44.616.44 1.009v7.142c0 .393-.147.73-.44 1.01-.294.28-.648.419-1.06.419h-9ZM6 11.429c.412 0 .766-.14 1.06-.42.293-.28.44-.616.44-1.009 0-.393-.147-.73-.44-1.01A1.483 1.483 0 0 0 6 8.572c-.412 0-.766.14-1.059.42-.294.28-.441.616-.441 1.009 0 .393.147.73.441 1.01.293.279.647.419 1.059.419ZM3.75 5h4.5V3.571c0-.595-.219-1.1-.656-1.517A2.226 2.226 0 0 0 6 1.429c-.625 0-1.156.208-1.594.625A2.018 2.018 0 0 0 3.75 3.57V5Z"
      fill="#000"
    />
  </Svg>
  )
}

const EmailSvg = () => {
  return(
    <Svg
    width={16}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.6 12c-.44 0-.817-.147-1.13-.44A1.401 1.401 0 0 1 0 10.5v-9A1.4 1.4 0 0 1 .47.441C.783.147 1.16 0 1.6 0h12.8c.44 0 .817.147 1.13.441A1.4 1.4 0 0 1 16 1.5v9c0 .412-.156.766-.47 1.06-.313.293-.69.44-1.13.44H1.6ZM8 6.619c.067 0 .137-.01.21-.029a.85.85 0 0 0 .21-.084l5.66-3.319a.64.64 0 0 0 .24-.233.617.617 0 0 0 .08-.31.605.605 0 0 0-.34-.563c-.227-.125-.46-.119-.7.019L8 5.25 2.64 2.1c-.24-.138-.473-.14-.7-.01-.227.132-.34.316-.34.554a.65.65 0 0 0 .08.327.52.52 0 0 0 .24.216l5.66 3.32a.85.85 0 0 0 .21.083.833.833 0 0 0 .21.029Z"
      fill="#000"
    />
  </Svg>
  )
}

const PhoneSvg = () => {
  return (
      <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M3.038 16a.763.763 0 0 1-.563-.225.763.763 0 0 1-.225-.563v-3.037c0-.175.056-.328.169-.46a.762.762 0 0 1 .431-.252l2.587-.525c.175-.026.354-.01.535.046.181.056.328.141.44.254L8.175 13a13.718 13.718 0 0 0 2.606-2.044 12.452 12.452 0 0 0 1.969-2.531l-1.8-1.838a.77.77 0 0 1-.216-.384 1.353 1.353 0 0 1-.009-.478l.488-2.625a.66.66 0 0 1 .243-.431.72.72 0 0 1 .469-.169h3.037c.226 0 .413.075.563.225.15.15.225.337.225.563 0 1.612-.36 3.184-1.079 4.715a14.283 14.283 0 0 1-2.85 4.069 14.287 14.287 0 0 1-4.067 2.85C6.221 15.64 4.65 16 3.037 16Z"
      fill="#000"
    />
  </Svg>
  )
}

const ProceedButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: 'gold', flexDirection: 'row', padding: 10, borderRadius: 5}}>
          <Text style={{alignSelf: 'center', marginRight: 10}}>Proceed</Text>
            <Svg
              width={24}
              height={25}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="m12.7 15.55 2.6-2.6a.948.948 0 0 0 .275-.7.948.948 0 0 0-.275-.7l-2.625-2.625a.893.893 0 0 0-.687-.263.98.98 0 0 0-.688.288.948.948 0 0 0-.275.7c0 .283.092.517.275.7l.9.9H8.975a.928.928 0 0 0-.7.287.993.993 0 0 0-.275.713c0 .283.096.52.288.712A.965.965 0 0 0 9 13.25h3.2l-.925.925a.894.894 0 0 0-.263.688.979.979 0 0 0 .288.687.948.948 0 0 0 .7.275.948.948 0 0 0 .7-.275Zm-.7 6.7a9.733 9.733 0 0 1-3.9-.788 10.092 10.092 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.733 9.733 0 0 1 2 12.25c0-1.383.263-2.683.788-3.9a10.092 10.092 0 0 1 2.137-3.175c.9-.9 1.958-1.613 3.175-2.138A9.743 9.743 0 0 1 12 2.25c1.383 0 2.683.262 3.9.787a10.105 10.105 0 0 1 3.175 2.138c.9.9 1.612 1.958 2.137 3.175a9.733 9.733 0 0 1 .788 3.9 9.733 9.733 0 0 1-.788 3.9 10.092 10.092 0 0 1-2.137 3.175c-.9.9-1.958 1.612-3.175 2.137a9.733 9.733 0 0 1-3.9.788Z"
                fill="#000"
              />
            </Svg>
      </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '5%',
  },
  topBar: {
    flex: 1
  },
  titleSection: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  inputSection: {
    flex: 14,
    flexDirection: 'column',
  },
  buttonSection: {
    alignItems: 'flex-end'
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
});

