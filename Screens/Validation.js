import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function Validation() {
  const [cardNumber, setCardNumber] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [exp, setExp] = useState("");

  // const [focus, setFocus] = useState(false);

  // const[flagCN, setFlagCN] = useState(true);
  // const[flagD, setFlagD] = useState(true);
  // const[flagCCV, setFlagCCV] = useState(true);
  // const[flagF, setFlagF] = useState(true);
  // const[flagL, setFlagL] = useState(true);

  var resultCN = true;
  var resultCCV = true;
  var resultD = true;
  var resultF = true;
  var resultL = true;
  const testRef1 = useRef(null);
  const testRef2 = useRef(null);
  const testRef3 = useRef(null);
  const testRef4 = useRef(null);
  const testRef5 = useRef(null);

  const submit = () => {
    cardNumberValidator(cardNumber);
    dateValidator(exp);
    ccvValidator(code);
    firstNameValidator(name);
    lastNameValidator(lname);
    console.log(
      "-->" +
        resultCN +
        "-->" +
        resultCCV +
        "-->" +
        resultD +
        "-->" +
        resultF +
        "-->" +
        resultL
    );
    if (resultCN && resultCCV && resultD && resultF && resultL) {
      Alert.alert("Payemnet Sucesfull");
      console.log("Payment Successfull");

      
    } else {
      colorChanger();
    }
    if(resultL==false)testRef5.current.focus();
    if(resultF==false)testRef4.current.focus();
    if(resultCCV==false)testRef3.current.focus();
    if(resultD==false)testRef2.current.focus();
    if(resultCN==false)testRef1.current.focus();
  };
  const colorChanger = (color) => {};
  function cardNumberValidator(cardNumber) {
    var numSum = 0;
    var value;
    for (var i = 0; i < 16; ++i) {
      if (i % 2 == 0) {
        value = 2 * cardNumber[i];
        if (value >= 10) {
          value = Math.floor(value / 10) + (value % 10);
        }
      } else {
        value = +cardNumber[i];
      }
      numSum += value;
    }
    resultCN = numSum % 10 == 0;
    // setFlagCN(resultCN);
    console.log("cnum " + resultCN);
    return resultCN;
  }

  const ccvValidator = (ccv) => {
    resultCCV = parseInt(ccv) >= 100 && parseInt(ccv) <= 9999;
    // setFlagCCV(resultCCV);
    console.log("ccv " + resultCCV);
    return resultCCV;
  };

  const dateValidator = (date) => {
    var mm = date.split("/")[0];
    var yy = date.split("/")[1];

    // Regex for date validation

    var regex = "^[0-9]{2}$";

    if (!mm.match(regex) || !yy.match(regex)) {
      resultD = false;
      // setFlagD(false);
      console.log("date regex " + false);
      return false;
    } else if (parseInt(mm) >= 1 && parseInt(mm) <= 12) {
      resultD = true;
      // setFlagD(true);
      console.log("date " + true);
      return true;
    }
    resultD = false;
    // setFlagD(false);
    console.log("date " + false);
    return false;
  };

  const firstNameValidator = (firstName) => {
    var regex = "^[A-Za-zs]+$";
    if (firstName.match(regex)) {
      resultF = true;
      // setFlagF(true);
      console.log("fname " + true);
      return true;
    }
    resultF = false;
    //    setFlagF(false);
    console.log("fname " + false);
    return false;
  };
  //^[a-zA-z\s]+$
  const lastNameValidator = (lastName) => {
    var regex = "^[A-Za-zs]+$";
    if (lastName.match(regex)) {
      resultL = true;
      // setFlagL(true);
      console.log("lname " + true);
      return true;
    }
    resultL = false;
    // setFlagL(false)
    console.log("lname " + false);
    return false;
  };

  return (
    <KeyboardAvoidingView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Credit Card Input Excercise</Text>
      </View>
      <View style={styles.box}>
        <TextInput
          autoFocus={true}
          id="cnField"
          mode="outlined"
          label="Card Number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
          theme={{ colors: { primary: "green" } }}
          keyboardType="phone-pad"
          ref={testRef1}
        />
        <View style={styles.box2}>
          <TextInput
           autoFocus={true}
            id="dField"
            style={styles.input}
            mode="outlined"
            label="MM/YY"
            value={exp}
            onChangeText={(text) => setExp(text)}
            theme={{ colors: { primary: "green" } }}
            keyboardType="phone-pad"
            ref={testRef2}
          />
          <TextInput
            autoFocus={true}
            style={styles.input}
            id="ccvField"
            mode="outlined"
            label="Security Code"
            value={code}
            onChangeText={(text) => setCode(text)}
            theme={{ colors: { primary: "green" } }}
            keyboardType="phone-pad"
            secureTextEntry={true}
            ref={testRef3}
          />
        </View>
        <View style={styles.box2}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            id="fField"
            mode="outlined"
            label="First name"
            value={name}
            onChangeText={(text) => setName(text)}
            theme={{ colors: { primary: "green" } }}
            ref={testRef4}
          />

           <TextInput
          autoFocus={true}
            style={styles.input}
            id="lField"
            style={styles.input}
            mode="outlined"
            label="Last name"
            value={lname}
            onChangeText={(text) => setLname(text)}
            theme={{ colors: { primary: "green" } }}
             ref={testRef5}
          /> 
        </View>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={submit}
          theme={{ colors: { primary: "#2150f5" } }}
        >
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  box: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  header: {
    backgroundColor: "blue",
    borderColor: "black",
  },
  headerText: {
    margin: 10,
    fontSize: 30,
    textAlign: "left",
    color: "white",
  },
  box2: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    marginTop: 8,
  },
  box1: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    width: "46%",
    margin: 5,
  },
});
