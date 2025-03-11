import {ScrollView, Text, View} from 'react-native';
import {SkillInfo} from "@/types/user.interface";
import React from "react";
import {ScaledSheet} from "react-native-size-matters";
import {useTranslation} from "react-i18next";

type SkillListProps = {
    skillList: SkillInfo[];
}

export default function SkillList({skillList}: SkillListProps) {
    const {t} = useTranslation();

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Profile.skillList.title')}</Text>
                {skillList.map(skill => {
                    return (
                        <View key={skill.id} style={styles.skillRow}>
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
    container: {
        marginLeft: '5@s',
        marginRight: '5@s'
    },
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    title: {
        fontWeight: 'bold'
    }
});
