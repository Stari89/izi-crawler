import { StyleSheet, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { Stat } from '../../models';
import React from 'react';
import { Text } from 'react-native-paper';

interface StatsTableProps {
    stats: Stat[];
    columns: number;
}
const StatsTable = (props: StatsTableProps) => {
    const { stats, columns } = props;
    const theme = useTheme();

    const statsTable: Stat[][] = [];
    const statsCopy = [...stats];
    while (statsCopy.length) {
        statsTable.push(statsCopy.splice(0, columns));
    }

    return (
        <>
            {statsTable.map((statsRow, rowIdx) => (
                <React.Fragment key={rowIdx}>
                    <Divider style={styles.divider} />
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
                                    <Text variant="displaySmall" style={styles.value}>
                                        {stat.value}
                                    </Text>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </React.Fragment>
            ))}
            <Divider style={styles.divider} />
        </>
    );
};

export default StatsTable;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    cell: { alignItems: 'center', flex: 1 },
    label: { opacity: 0.5, fontWeight: '100' },
    value: {},
    divider: {
        marginVertical: 16,
    },
    verticalDivider: {
        width: 0.5,
        opacity: 0.2,
    },
});
