import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";


export default function App() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("1");
    const [fact, setFact] = useState("");
    const [error, setError] = useState(null);
    const months = {
        "January": "1",
        "February": "2",
        "March": "3",
        "April": "4",
        "May": "5",
        "June": "6",
        "July": "7",
        "August": "8",
        "September": "9",
        "October": "10",
        "November": "11",
        "December": "12"
    };

    const apiUrl = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;

    useEffect(() => {
        if (day != "") {
            fetchApi();
        }

    }, [day, month]);

    const fetchApi = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
                    'x-rapidapi-key': '7cf2518a04msh6d52e3a07ce472cp13db31jsne01d0c8d809d'
                }
            });
            const data = await response.text();
            setFact(data);
        }
        catch (e:any) {
            setError(e);
        }
    }

    return(
       <View style={styles.container}>
            <View>
                <Text>{fact}</Text>
            </View>
            <View>
            <TextInput
                style={styles.input}
                keyboardType = 'numeric'
                value={day}
                onChangeText={setDay}
                />
            <Picker
                selectedValue={month}
                onValueChange={(monthValue) => setMonth(monthValue)}
                style={styles.input}
            >
                {Object.entries(months).map(([monthName, monthNumber]) => (
                    <Picker.Item key={monthNumber} label={monthName} value={monthNumber} />
                ))}
            </Picker>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    container: {
        justifyContent: "center",
        
    },
    picker: {
        alignItems: "center"
    }
});