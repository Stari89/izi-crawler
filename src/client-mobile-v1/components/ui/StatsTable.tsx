import { StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { Stat } from '../../models';
import React from 'react';
import { Text } from 'react-native-paper';

interface StatsTableProps {
    stats: Stat[];
    columns: number;
    size?: 'normal' | 'small';
    topBottomDividers?: boolean;
}
const StatsTable = (props: StatsTableProps) => {
    const { stats, columns, size = 'normal', topBottomDividers = true } = props;
    const theme = useTheme();

    const statsTable: Stat[][] = [];
    const statsCopy = [...stats];
    while (statsCopy.length) {
        statsTable.push(statsCopy.splice(0, columns));
    }

    return (
        <View style={[topBottomDividers && styles.container]}>
            {statsTable.map((statsRow, rowIdx) => (
                <React.Fragment key={rowIdx}>
                    {(topBottomDividers || rowIdx > 0) && <Divider />}
                    <View style={styles.row}>
                        {statsRow.map((stat, statIdx) => (
                            <React.Fragment key={statIdx}>
                                {statIdx > 0 && (
                                    <View
                                        style={[styles.verticalDivider, { backgroundColor: theme.colors.onBackground }]}
                                    ></View>
                                )}
                                <View style={styles.cell}>
                                    <Text variant="labelSmall" style={styles.label}>
                                        {stat.label}
                                    </Text>
                                    <Text variant="displaySmall" style={[size == 'small' && styles.value]}>
                                        {stat.value}
                                    </Text>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </React.Fragment>
            ))}
            {topBottomDividers && <Divider />}
        </View>
    );
};

export default StatsTable;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 16,
    },
    cell: { alignItems: 'center', flex: 1 },
    label: { opacity: 0.5, fontWeight: '100' },
    value: {
        fontSize: 24,
    },
    divider: {
        marginVertical: 16,
    },
    verticalDivider: {
        width: 0.5,
        opacity: 0.2,
    },
});
