import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";
import {useTranslation} from "react-i18next";
import {SkillInfo} from "@/constants/interfaces/skill-info.interface";

type SkillListProps = {
    skillList: SkillInfo[] | null;
}

export default function SkillList({skillList}: SkillListProps) {
    const {t} = useTranslation();

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Profile.skillList.title')}</Text>
                {skillList && skillList.map((skill, index) => {
                    return (
                        <View key={skill.id}
                              style={[styles.skillRow, (index !== skillList.length - 1 && styles.borderBottom)]}>
                            <Text>{skill.name}</Text>
                            <Text>{Math.round(skill.level * 100) / 100}</Text>
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
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15@s'
    },
    title: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});
