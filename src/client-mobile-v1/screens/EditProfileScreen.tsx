import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Divider, HelperText, TextInput, useTheme } from 'react-native-paper';
import { USERS } from '../data/dummy-data';
import { Controller, useForm } from 'react-hook-form';

const EditProfileScreen = () => {
    const theme = useTheme();

    const { control, formState, handleSubmit, setError } = useForm<any>();

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <View style={styles.profilePictureContainer}>
                <Avatar.Image source={USERS[0].avatar} size={144} />
                <Button mode="outlined" style={styles.editPictureButton}>
                    Edit Picture
                </Button>
            </View>
            <Divider style={styles.divider} />
            <Controller
                control={control}
                defaultValue=""
                name="fullName"
                rules={{
                    required: 'Full name is required.',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            autoComplete="name"
                            style={styles.textInput}
                            label="Full Name"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            error={!!formState.errors.fullName}
                        />
                        {formState.errors.email && (
                            <HelperText type="error">{/*formState.errors.email.message*/} todo</HelperText>
                        )}
                    </>
                )}
            />
            <Controller
                control={control}
                defaultValue=""
                name="bio"
                rules={{
                    required: 'Bio is required.',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            style={styles.textInput}
                            label="Bio"
                            mode="outlined"
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            error={!!formState.errors.bio}
                            multiline={true}
                            numberOfLines={4}
                        />
                        {formState.errors.bio && (
                            <HelperText type="error">{/*formState.errors.email.message*/} todo</HelperText>
                        )}
                    </>
                )}
            />
        </ScrollView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    innerContainer: {
        alignSelf: 'center',
        maxWidth: 800,
        width: '100%',
    },
    profilePictureContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    divider: {
        marginVertical: 16,
    },
    editPictureButton: {
        marginTop: 8,
    },
    textInput: {
        marginVertical: 4,
    },
});
