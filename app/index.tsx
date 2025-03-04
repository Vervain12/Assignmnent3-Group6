import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Dropdown from '../components/dropdown';
import { useState, useEffect } from "react";

export default function App() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("1");
    const [monthName, setMonthName] = useState("January");
    const [fact, setFact] = useState("");
    const [dropdownClicked, setDropdownClicked] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const months = {
        "January": "1", "February": "2", "March": "3", "April": "4",
        "May": "5", "June": "6", "July": "7", "August": "8",
        "September": "9", "October": "10", "November": "11", "December": "12"
    };

    const apiUrl = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;

    useEffect(() => {
        if (day !== "") {
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
        } catch (e) {
            setError(e instanceof Error ? e : new Error('An unknown error occurred.'));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.factText}>{fact}</Text>
            
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={day}
                onChangeText={setDay}
            />

            {/* Button to toggle dropdown */}
            <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setDropdownClicked(prev => !prev)}>
                <Text style={styles.dropdownButtonText}>{monthName}</Text>
            </TouchableOpacity>

            {/* Conditional rendering for dropdown */}
            {dropdownClicked && (
                <Dropdown 
                    months={months} 
                    setMonth={setMonth} 
                    setMonthName={setMonthName} 
                />
            )}

            {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20
    },
    input: {
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        textAlign: "center",
        fontSize: 16
    },
    factText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: "#333",
        marginBottom: 15
    },
    dropdownButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10
    },
    dropdownButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 10
    }
});
