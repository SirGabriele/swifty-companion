import {View, Text} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";

type DisplayValueProps = {
    value: string | number;
    label: string;
}

export default function DisplayValue({value, label}: DisplayValueProps) {
    return (
        <View style={styles.container}>
            <Text>{value}</Text>
            <Text>{label}</Text>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})