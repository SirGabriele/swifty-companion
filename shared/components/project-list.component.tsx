import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {ProjectInfo} from "@/constants/interfaces/project-info.interface";

type ProjectListProps = {
    projectList: ProjectInfo[];
}

export default function ProjectList({projectList}: ProjectListProps) {
    const {t} = useTranslation();

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Profile.projectList.title')}</Text>
                {projectList.map((project, index) => {
                    return (
                        <View key={project.id} style={[index !== projectList.length - 1 && styles.borderBottom]}>
                            <View style={styles.projectRow}>
                                <Text>{project.name}</Text>
                                <View style={styles.gradeContainer}>
                                    {project.marked
                                        ? project['validated?']
                                            ? <Ionicons style={[styles.icons, styles.textGreen]}
                                                        name={"checkmark-sharp"}/>
                                            : <Ionicons style={[styles.icons, styles.textRed]} name={"close-sharp"}/>
                                        : <Ionicons style={[styles.icons, styles.textOrange]} name={"timer-outline"}/>}
                                    <Text>{project.final_mark ? project.final_mark : 0}</Text>
                                </View>
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
    icons: {
        fontSize: '15@s',
        fontWeight: 'bold'
    },
    gradeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '40@s'
    },
    projectRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: '15@s'
    },
    textGreen: {
        color: 'green',
    },
    textOrange: {
        color: 'orange',
    },
    textRed: {
        color: 'red',
    },
    title: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})
