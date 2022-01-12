import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Validation() {
  const [cardNumber, setCardNumber] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [exp, setExp] = useState('');

  const [flagCN, setFlagCN] = useState('green');
  const [flagD, setFlagD] = useState('green');
  const [flagCCV, setFlagCCV] = useState('green');
  const [flagF, setFlagF] = useState('green');
  const [flagL, setFlagL] = useState('green');

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

    if (resultCN && resultCCV && resultD && resultF && resultL) {
      Alert.alert('Paymet Sucesfull');
    }
    if (resultL == false) testRef5.current.focus();
    if (resultF == false) testRef4.current.focus();
    if (resultCCV == false) testRef3.current.focus();
    if (resultD == false) testRef2.current.focus();
    if (resultCN == false) testRef1.current.focus();
  };

  useEffect(()=>{
    testRef1.current.focus();
  },[])

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

    setFlagCN(resultCN ? 'green' : 'red');

    return resultCN;
  }

  const ccvValidator = (ccv) => {
    resultCCV = parseInt(ccv) >= 100 && parseInt(ccv) <= 9999;
    setFlagCCV(resultCCV ? 'green' : 'red');
    return resultCCV;
  };

  const dateValidator = (date) => {
    var mm = date.split('/')[0];
    var yy = date.split('/')[1];

    var regex = '^[0-9]{2}$';

    if (!mm.match(regex) || !yy.match(regex)) {
      resultD = false;
      setFlagD('red');
      return false;
    } else if (parseInt(mm) >= 1 && parseInt(mm) <= 12) {
      resultD = true;
      setFlagD('green');
      return true;
    }
    resultD = false;
    setFlagD('red');
    return false;
  };

  const firstNameValidator = (firstName) => {
    var regex = '^[A-Za-zs]+$';
    if (firstName.match(regex)) {
      resultF = true;
      setFlagF('green');
      return true;
    }
    resultF = false;
    setFlagF('red');
    return false;
  };
  //^[a-zA-z\s]+$
  const lastNameValidator = (lastName) => {
    var regex = '^[A-Za-zs]+$';
    if (lastName.match(regex)) {
      resultL = true;
      setFlagL('green');
      return true;
    }
    resultL = false;
    setFlagL('red');
    return false;
  };

  return (
    <KeyboardAvoidingView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Credit Card Input Excercise</Text>
      </View>
      <View style={styles.box}>
        <View style={{ paddingHorizontal: 2 }}>
          <TextInput
            autoFocus={true}
            id="cnField"
            mode="outlined"
            label="Card Number"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
            theme={{ colors: { primary: flagCN } }}
            keyboardType="phone-pad"
            ref={testRef1}
          />
          {flagCN == 'red' ? (
            <Text style={{ color: 'red' }}>Card number invalid</Text>
          ) : (
            <Text> </Text>
          )}
        </View>
        <View style={styles.box2}>
          <View style={{ width: '45%' }}>
            <TextInput
              autoFocus={true}
              id="dField"
              style={styles.input}
              mode="outlined"
              label="MM/YY"
              value={exp}
              onChangeText={(text) => setExp(text)}
              theme={{ colors: { primary: flagD } }}
              keyboardType="phone-pad"
              ref={testRef2}
            />
            {flagD == 'red' ? (
              <Text style={{ color: 'red', paddingLeft:4  }}>Invalid date format</Text>
            ) : (
              <Text> </Text>
            )}
          </View>
          <View style={{ width: '45%' }}>
            <TextInput
              autoFocus={true}
              style={styles.input}
              id="ccvField"
              mode="outlined"
              label="Security Code"
              value={code}
              onChangeText={(text) => setCode(text)}
              theme={{ colors: { primary: flagCCV } }}
              keyboardType="phone-pad"
              secureTextEntry={true}
              ref={testRef3}
            />
            {flagCCV == 'red' ? (
              <Text style={{ color: 'red', paddingLeft:4  }}>Security code invalid</Text>
            ) : (
              <Text> </Text>
            )}
          </View>
        </View>
        <View style={styles.box2}>
          <View style={{ width: '45%' }}>
            <TextInput
              autoFocus={true}
              style={styles.input}
              id="fField"
              mode="outlined"
              label="First name"
              value={name}
              onChangeText={(text) => setName(text)}
              theme={{ colors: { primary: flagF } }}
              ref={testRef4}
            />
            {flagF == 'red' ? (
              <Text style={{ color: 'red', paddingLeft:4  }}>First name invalid</Text>
            ) : (
              <Text> </Text>
            )}
          </View>
          <View style={{ width: '45%' }}>
            <TextInput
              autoFocus={true}
              style={styles.input}
              id="lField"
              style={styles.input}
              mode="outlined"
              label="Last name"
              value={lname}
              onChangeText={(text) => setLname(text)}
              theme={{ colors: { primary: flagL } }}
              ref={testRef5}
            />
            {flagL == 'red' ? (
              <Text style={{ color: 'red', paddingLeft:4 }}>Last name invalid</Text>
            ) : (
              <Text> </Text>
            )}
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 27, paddingTop: 20 }}>
        <Button
          mode="contained"
          onPress={submit}
          theme={{ colors: { primary: 'green' } }}>
          Submit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  box: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    backgroundColor: 'blue',
    borderColor: 'black',
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    padding:10
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    margin: 5,
  },
});