import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {

  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [BAC, setBAC] = useState(0);

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const numBottles=range(1,20)
  const hours=range(1,24)

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  function calculate() {
    let result = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsleft = grams - burning * time;

    if (gender === 'male') {
      result = gramsleft / (weight * 0.7);
    }
    else {
      result = gramsleft / (weight * 0.6);
    }

    if (result < 0) {
      result = 0;
    }
    setBAC(result);
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Alcometer</Text>
        <View style={styles.field}>
          <View  style={styles.weight}>
          <Text style={styles.headers}>Weight</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setWeight(text)}
            placeholder='in kilograms'
            keyboardType='numeric'></TextInput>
            </View>
      </View>
      <View style={styles.field}>
        <Text style={styles.headers}>Bottles</Text>
          <Picker   style={styles.dropdown}
            selectedValue={bottles}
            onValueChange={(itemValue) => setBottles(itemValue)}
          >
          {numBottles.map((bottles) => (
            <Picker.Item label={bottles + ' Bottles'} value={bottles} />
          ))
          }
          </Picker>
      </View>
      <View style={styles.field}>
        <Text style={styles.headers}>Time</Text>
          <Picker   style={styles.dropdown}
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}
          >
          {hours.map((time) => (
            <Picker.Item label={time + ' Hours'} value={time}/>
          ))
          }
          </Picker>
      </View>

      <View style={styles.radio}>
        <Text style={styles.headers}>Gender</Text>
        <RadioForm
          style={styles.radio}
          buttonSize={10}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />
          <Text style={styles.result}>{BAC.toFixed(2)}</Text>
      </View>
      <Button onPress={calculate} title='Calculate'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#87CEEB",
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
  },
  headers: {
    fontWeight: "bold",
    fontSize: 15,
  },
  weight: {
    borderBottomWidth: 1,
  },
  dropdown: {
    borderWidth: 0,
    marginTop: 15,
  },
  result: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#87CEEB",
  },
});
