import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";
import {useTranslation} from "react-i18next";
import {SkillInfo} from "@/constants/interfaces/skill-info.interface";

type SkillListProps = {
    skillList: SkillInfo[] | null;
}

export default function SkillList({skillList}: SkillListProps) {
    const {t} = useTranslation();

    const roundToTwoDecimals = (value: number): number => {
        return Math.round(value * 100) / 100;
    }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Profile.skillList.title')}</Text>
                {skillList && skillList.map((skill, index) => {
                    const skillLevel = roundToTwoDecimals(skill.level);

                    return (
                        <View key={skill.id}
                              style={[styles.skillRow, (index !== skillList.length - 1 && styles.borderBottom)]}>
                            <Text>{skill.name}</Text>
                            <View style={styles.percentage}>
                                <Text>{roundToTwoDecimals(skillLevel % 1 * 100)}%</Text>
                                <Text>{skillLevel}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    borderBottom: {
        borderBottomWidth: 1
    },
    container: {
        paddingLeft: '5@s',
        paddingRight: '5@s'
    },
    percentage: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80@s',
        justifyContent: 'space-between'
    },
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});
