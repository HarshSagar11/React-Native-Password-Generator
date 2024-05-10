import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = yup.object().shape({
  passWordLength: yup
    .number()
    .min(4, 'Should be of 4 characters.')
    .max(16, 'Should be not more than 16 chracters.')
    .required('Length is required.'),
});

const App = () => {
  const [password, setpassword] = useState('');
  const [isPassGenerated, setisPassGenerated] = useState(false);

  const [lowerCase, setlowerCase] = useState(true);
  const [uppercase, setuppercase] = useState(false);
  const [numbers, setnumbers] = useState(false);
  const [symbols, setsymbols] = useState(false);

  const getChracterString = (passwordLength: number) => {
    setisPassGenerated(true);
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const numbersChar = '1234567890';
    const symbolsChar = '!@#$%^&*()_+';
    let resultantString: string = '';
    if (lowerCase) {
      resultantString += lowerCaseChar;
    }
    if (uppercase) {
      resultantString += upperCaseChar;
    }
    if (numbers) {
      resultantString += numbersChar;
    }
    if (symbols) {
      resultantString += symbolsChar;
    }

    generatePassword(resultantString, passwordLength);
  };

  const generatePassword = (charString: string, passWordLength: number) => {
    let genreratedPassword: string = '';
    for (let i = 0; i < passWordLength; i++) {
      let index = Math.round(Math.random() * charString.length);
      genreratedPassword += charString[index];
    }
    setpassword(genreratedPassword);
    setisPassGenerated(true);
  };

  const resetPassword = () => {
    setpassword('');
    setisPassGenerated(false);
    setlowerCase(false);
    setuppercase(false);
    setnumbers(false);
    setsymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passWordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log(values);
              getChracterString(+values.passWordLength);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passWordLength && errors.passWordLength && (
                      <Text style={styles.errorText}>
                        {errors.passWordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passWordLength}
                    onChangeText={handleChange('passWordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => {
                      setlowerCase(!lowerCase);
                    }}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                  <BouncyCheckbox
                    isChecked={uppercase}
                    onPress={() => {
                      setuppercase(!uppercase);
                    }}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => {
                      setnumbers(!numbers);
                    }}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => {
                      setsymbols(!symbols);
                    }}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={()=>handleSubmit()}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View>
          {isPassGenerated ? 
          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}>Result: </Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View> 
          : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
