import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
  
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Validation() {
    const [cardNumber,setCardNumber] = useState('');
    const [code,setCode] = useState('');
    const [name,setName] = useState('');
    const [lname,setLname] = useState('');
    const [exp,setExp] = useState('');

    const [color, setColor] = useState("gray"); 

    const[flagCN, setFlagCN] = useState(true); 
    const[flagD, setFlagD] = useState(true); 
    const[flagCCV, setFlagCCV] = useState(true); 
    const[flagF, setFlagF] = useState(true);
    const[flagL, setFlagL] = useState(true); 


   const submit =()=>{

        if(cardNumberValidator(cardNumber) && ccvValidator(code) && firstNameValidator(name) && lastNameValidator(lname) && dateValidator(exp)){
            console.log("Payment Successful");
            Alert.alert("Payment Successful")
        }

    }
    function cardNumberValidator(sixteenDigitString) {
        var numSum = 0;
        var value;
        for (var i = 0; i < 16; ++i) {
            if (i % 2 == 0) {
                value = 2 * sixteenDigitString[i];
                if (value >= 10) {
                    value = (Math.floor(value / 10) + value % 10);
                }
            } else {
                value = +sixteenDigitString[i];
            }
            numSum += value;
        }
        var result = numSum % 10 == 0;
        setFlagCN(result);
        console.log("cnum "+result);
        return result;
    } 

    const ccvValidator = (ccv) =>{
        var result = (parseInt(ccv) >= 100) && (parseInt(ccv) <= 9999)
        setFlagCCV(result);
        console.log("ccv "+result);
        return result;
    }

    const dateValidator= (date)=>{

        var mm = date.split('/')[0];
        var yy = date.split('/')[1];

        // Regex for date validation

        var regex = '^[0-9]{2}$';

        if(!mm.match(regex) || !yy.match(regex)){
            setFlagD(false);
            console.log("date regex "+false)
            return false;
        }

        if(parseInt(mm)>=1 && parseInt(mm)<=12){
            setFlagD(true);
            console.log("date "+true)
            return true;
        }
        setFlagD(false);
        console.log("date "+false)
        return false;

    }

    const firstNameValidator = (firstName) =>{
        var regex = "[a-zA-Z][a-zA-Z ]*";
        if(firstName.match(regex)){
            setFlagF(true);
            console.log("fname "+true)
            return true;
        }
        setFlagF(false);
        console.log("fname "+false)
        return false;
    }

    const lastNameValidator = (lastName)=>{
        var regex = "[a-zA-Z][a-zA-Z ]*";
        if(lastName.match(regex)){
            setFlagL(true);
            console.log("lname "+true)
            return true;
        }
        setFlagL(false)
        console.log("lname "+true)
        return false;
    }

    return (
        
       <KeyboardAvoidingView style ={styles.main}>
       <View style = {styles.header}>
           <Text style = {styles.headerText}>
               Credit Card Input Excercise
           </Text>
       </View>
       <View style = {styles.box}>
           <TextInput
           mode = "outlined"
           label="Card Number"
           value = {cardNumber}
           onChangeText={(text) =>setCardNumber(text) }
           theme={{colors: {primary: "green"}}}
           />
           <TextInput
           mode = "outlined"
           label="MM/YY"
           value = {exp}
           onChangeText={(text) =>setExp(text) }
           theme={{colors: {primary: "green"}}}
           />
           <TextInput
           mode = "outlined"
           label="Security Code"
           value = {code}
           onChangeText={(text) =>setCode(text) }
           theme={{colors: {primary: "green"}}}
           />
           <TextInput
           mode = "outlined"
           label="First name"
           value = {name}
           onChangeText={(text) =>setName(text) }
           theme={{colors: {primary: "green"}}}
           />

            <TextInput
           mode = "outlined"
           label="Last name"
           value = {lname}
           onChangeText={(text) =>setLname(text) }
           theme={{colors: {primary: "green"}}}
           />
       </View>
       <View>
        <Button mode="contained" onPress={submit} 
          theme={{colors: {primary: '#2150f5'}}}>
          Submit
        </Button> 
       </View>
   </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    main:{
    display: 'flex',
    flexDirection: "column",
    flex: 1,
    paddingTop:10,
    backgroundColor: "white"
    },
    box:{
        paddingHorizontal:30,
        paddingTop:30
    },
    header:{
        backgroundColor:'blue',
        borderColor:'black',
        
    },
    headerText:{
        margin:10,
      fontSize:30,
      textAlign:'left',
      color:'white'
    }
})