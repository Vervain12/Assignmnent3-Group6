import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import  Dropdown  from '../components/dropdown';
import { useState, useEffect } from "react";


export default function App() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("1");
    const [monthName, setMonthName] = useState("January");
    const [fact, setFact] = useState("");
    const [dropdownClicked, setDropdownClicked] = useState(false);
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

    useEffect(() => {
        handleShowDropdown();
    }, [month])

    const handleShowDropdown = () => {
        setDropdownClicked(!dropdownClicked);
    }

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
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    keyboardType = 'numeric'
                    value={day}
                    onChangeText={setDay}
                    />
                { dropdownClicked ? 
                    <Dropdown
                        months={months}
                        setMonth={setMonth}
                        setMonthName={setMonthName}/>
                        :
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={handleShowDropdown}>
                        <Text>{monthName}</Text>
                    </TouchableOpacity>
                }
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      width: "70%",
      textAlign: "center",
      padding: 10,
      borderRadius: 5
    },
    inputArea: {
        alignItems: "center",
        width: "70%"
    },
    container: {
        alignItems: "center"
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        width: '70%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center'
    },
});