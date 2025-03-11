import {ActivityIndicator, Dimensions, Image, ImageBackground, Pressable, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import useFetchStore from "@/stores/fetch.store";
import {useTranslation} from "react-i18next";
import {router} from "expo-router";
import DisplayValue from "@/shared/components/displayValue.component";
import {ProjectInfo, SkillInfo, User} from "@/types/user.interface";
import ProjectList from "@/shared/components/projectList.component";
import SkillList from "@/shared/components/skillList.component";

export default function Profile() {
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useFetchStore();
    const {t} = useTranslation();
    let cursusId: number;

    useEffect(() => {
        if (user) {
            setIsLoaded(true);
        }
    }, []);


    const getValidatedProjects = (user: User | null) => {
        if (!user || !user.projects_users) {
            return t("Profile.notAvailable");
        }

        let amount = 0;
        for (const project of user.projects_users) {
            if (project.status === "finished") {
                amount++;
            }
        }

        return amount;
    }

    const getCCLevel = (user: User | null) => {
        if (!user || !user.cursus_users) {
            return t("Profile.notAvailable");
        }

        for (const cursusUser of user.cursus_users) {
            if (cursusUser.cursus.name === "42cursus") {
                cursusId = cursusUser.cursus_id;
                return cursusUser.level;
            }
        }

        for (const cursusUser of user.cursus_users) {
            if (cursusUser.cursus.name === "C Piscine") {
                cursusId = cursusUser.cursus_id;
                return cursusUser.level;
            }
        }

        return t("Profile.notAvailable");
    }

    const getUserStringInfo = (valueToDisplay: string | undefined): string => {
        return valueToDisplay ? valueToDisplay : t("Profile.notAvailable");
    }

    const getUserProjects = (user: User): ProjectInfo[] => {
        return user.projects_users.filter(project => project.cursus_ids.includes(cursusId)).map(project => ({
            id: project.id,
            name: project.project.name,
            final_mark: project.final_mark,
            'validated?': project['validated?'],
            marked: project.marked
        }))
    }

    const getUserSkills = (user: User): SkillInfo[] => {
        return user.cursus_users.find(cursus => cursus.cursus_id === cursusId)!.skills;
    }

    const profilePicture = () => {
        const profilePictureUri = user?.image.versions.medium || null;

        return (
            <View>
                <Image style={[styles.profilePicture]}
                       source={profilePictureUri
                           ? {uri: profilePictureUri}
                           : require('@/assets/images/default_profile_picture.jpg')}/>
            </View>
        )
    }

    const contactRow = (icon: keyof typeof Ionicons.glyphMap, value: string) => (
        <View style={styles.contactRow}>
            <Ionicons style={[styles.contactIcons, styles.textWhite]} name={icon}/>
            <Text style={styles.textWhite}>{value ?? "Not available"}</Text>
        </View>
    );

    const contactSection = () => {
        return (
            <View style={styles.aboutContainer}>
                <View style={[styles.aboutPrimaryContent]}>
                    <Text
                        style={styles.textWhite}>{getUserStringInfo(user?.first_name)} {getUserStringInfo(user?.last_name)}</Text>
                    <Text style={styles.textWhite}>{getUserStringInfo(user?.login)}</Text>
                </View>
                <View>
                    <Text style={styles.textWhite}>{t("Profile.contact")}</Text>
                    {contactRow("call-outline", getUserStringInfo(user?.phone))}
                    {contactRow("location-outline", getUserStringInfo(user?.campus[0].name))}
                    {contactRow("mail-outline", getUserStringInfo(user?.email))}
                </View>
            </View>
        )
    }

    if (!isLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large'/>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.pageContainer}>
            <ImageBackground source={require('@/assets/images/background.jpg')}
                             style={styles.profileBackground}>
                <View style={styles.backArrowContainer}>
                    <Pressable hitSlop={10} onPress={router.back}>
                        <Ionicons style={styles.backArrowIcon} name="arrow-back-outline"></Ionicons>
                    </Pressable>
                </View>

                <View style={styles.profileContent}>
                    {profilePicture()}
                    {contactSection()}
                </View>
            </ImageBackground>

            <View style={styles.infoBar}>
                <DisplayValue value={getValidatedProjects(user)} label={t("Profile.validatedProjects")}/>
                <View style={styles.separator}></View>
                <DisplayValue value={getCCLevel(user)} label={t("Profile.ccLevel")}/>
                <View style={styles.separator}></View>
                <DisplayValue value={getUserStringInfo(user?.wallet.toString())} label={t("Profile.wallets")}/>
            </View>

            {user?.projects_users &&
				<View style={styles.projectList}>
					<ProjectList projectList={getUserProjects(user)}/>
				</View>
            }

            {user?.cursus_users &&
				<View style={styles.projectList}>
					<SkillList skillList={getUserSkills(user)}/>
				</View>
            }
        </ScrollView>
    )
}

const {width, height} = Dimensions.get("window");
const profilePictureLength = width < height ? width / 2.5 : height / 2.5
const styles = ScaledSheet.create({
    aboutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    aboutPrimaryContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrowIcon: {
        color: 'white',
        fontSize: '30@s'
    },
    backArrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5@s'
    },
    contactIcons: {
        fontSize: '13@s',
    },
    infoBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        borderWidth: '2@s',
        borderRadius: '10@s',
        margin: '5@s'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageContainer: {
        height: '100%',
        width: '100%'
    },
    profileContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10@s'
    },
    profileBackground: {
        alignItems: 'center'
    },
    profilePicture: {
        width: profilePictureLength,
        height: profilePictureLength,
        borderRadius: profilePictureLength / 2,
        marginBottom: '20@s'
    },
    projectList: {
        // height: '200@s'
        height: height / 4,
        marginBottom: '20@s'
    },
    skillList: {
        height: height / 4
    },
    scrollableContent: {
        flex: 1,
        margin: '10@s',
        backgroundColor: 'lightgrey',
    },
    separator: {
        width: '2@s',
        backgroundColor: '#000',
    },
    textWhite: {
        color: 'white',
    }
})