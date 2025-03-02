import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";

type Props = {
    months: { [key: string]: string };
    setMonthName: any;
    setMonth: any;
};

const Dropdown: React.FC<Props> = ({months, setMonth, setMonthName}) =>
{

    const handleSelect = (selectedMonth: string, monthName: string) => {
        setMonth(selectedMonth);
        setMonthName(monthName);
    }

    return (
        <View style={styles.dropdown}>
            {Object.entries(months).map(([monthName, monthNumber]) => (
                <TouchableOpacity
                    onPress={() => handleSelect(monthNumber, monthName)}
                    key={monthNumber}>
                    <Text>{monthName}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default Dropdown;