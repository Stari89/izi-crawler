import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Text, useTheme } from 'react-native-paper';
import { USERS } from '../data/dummy-data';
import StatsTable from '../components/ui/StatsTable';
import { Stat } from '../models';

const MyProfileScreen = () => {
    const theme = useTheme();

    const stats: Stat[] = [
        {
            label: 'Followers',
            value: '99999',
        },
        {
            label: 'Crawls',
            value: '99999',
        },
        {
            label: 'Venues',
            value: '99999',
        },
    ];

    return (
        <ScrollView
            style={[styles.rootContainer, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.innerContainer}
        >
            <View style={styles.header}>
                <Avatar.Image source={USERS[0].avatar} size={72} />
                <StatsTable stats={stats} columns={3} size="small" topBottomDividers={false} style={styles.stats} />
            </View>
            <View style={styles.profileButtonsContainer}>
                <Button mode="outlined" style={styles.profileButton}>
                    Edit profile
                </Button>
                <Button mode="outlined" style={styles.profileButton}>
                    Share profile
                </Button>
            </View>
            <Text variant="bodyLarge" style={styles.fullName}>
                Damjan Kovačič
            </Text>
            <Text>
                Software Engineer | Metalhead | LEGO fan | Slav Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin a mauris id enim faucibus eleifend. Mauris luctus posuere dolor vel pellentesque. Suspendisse
                aliquam augue vel ligula vehicula laoreet. Aliquam orci dui, semper eu metus in, luctus sagittis mi.
                Integer hendrerit, risus ac posuere vulputate, magna arcu hendrerit velit, ut ultricies nibh quam in
                turpis. Maecenas sem risus, sollicitudin sagittis molestie sodales, vulputate a est. Cras felis velit,
                sodales at orci nec, gravida imperdiet arcu. Integer euismod consequat fermentum. Pellentesque at
                tincidunt felis. Aliquam vehicula nunc nibh. Aenean pretium est nec lacus laoreet, at aliquet neque
                rutrum. Fusce vel lobortis dolor, id hendrerit dui. Integer at pharetra nulla, in viverra lectus.
                Suspendisse ac quam vel ipsum convallis aliquet non venenatis leo. Curabitur a felis in ligula imperdiet
                vehicula. Ut nisi tellus, sollicitudin at auctor eu, consectetur in orci. Morbi sit amet urna nec diam
                egestas tincidunt. Mauris vestibulum tempus eros eu porttitor. Proin ac odio nulla. In nibh orci,
                posuere feugiat nisl non, commodo feugiat augue. Vivamus semper volutpat nisi, pretium scelerisque diam
                dignissim sed. Integer nec dignissim ipsum, a vehicula nisi. In at accumsan urna, ut sodales ante. Etiam
                dapibus, ante quis faucibus aliquet, tortor est ultricies dui, vitae vulputate turpis tellus eget orci.
                Nulla et elementum orci. Phasellus in arcu fringilla magna ullamcorper scelerisque in id metus. Integer
                quis consequat massa. Ut felis lorem, eleifend non nisi a, ornare dignissim est. Nam dignissim eros
                turpis, at porttitor libero aliquet quis. In rutrum porttitor egestas. Vestibulum congue porttitor
                ligula, et pellentesque velit tincidunt quis. Ut tincidunt sit amet ligula vel dignissim. Integer
                finibus mauris ipsum, quis venenatis nisl efficitur nec. Suspendisse posuere velit non elementum
                placerat. Nam venenatis nisl elit, eget convallis arcu faucibus eget. Integer mollis arcu nec diam
                dapibus, eget imperdiet lectus rutrum. Sed rutrum velit nisl, quis egestas diam ornare eget. Nulla vel
                turpis lacinia, imperdiet enim nec, vehicula velit. Nulla facilisi. Vestibulum dignissim rhoncus
                bibendum. In cursus convallis aliquet. Pellentesque et nisi vitae dolor vestibulum pulvinar. Praesent in
                nisl vel dui rhoncus tincidunt. Phasellus erat turpis, mollis ut odio non, aliquam luctus sapien.
                Vivamus molestie consectetur lorem at consequat. Cras sed neque vel arcu tempor pharetra vel ac nunc.
                Fusce varius sem eu lectus euismod, nec gravida nulla efficitur. Ut sagittis vel orci id suscipit.
            </Text>
        </ScrollView>
    );
};

export default MyProfileScreen;

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
    header: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 8,
        alignItems: 'center',
    },
    stats: {
        flex: 1,
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    profileButton: {
        flex: 1,
    },
    fullName: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
});
