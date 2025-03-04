import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Props = {
    months: { [key: string]: string };
    setMonthName: any;
    setMonth: any;
};

const Dropdown: React.FC<Props> = ({months, setMonth, setMonthName}) => {
    const handleSelect = (selectedMonth: string, monthName: string) => {
        setMonth(selectedMonth);
        setMonthName(monthName);
    }

    return (
        <View style={styles.container}>
            <View style={styles.dropdown}>
                {Object.entries(months).map(([monthName, monthNumber]) => (
                    <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleSelect(monthNumber, monthName)}
                        key={monthNumber}>
                        <Text style={styles.dropdownItemText}>{monthName}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%"
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        width: "70%"
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    dropdownItemText: {
        textAlign: "center",
        color: "black",
    },
});

export default Dropdown;