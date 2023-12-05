import React, { useMemo } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SectionGridList } from 'rn-section-grid-list';

export default function App() {
  const sections = useMemo(
    () => [
      { data: ['00', '11', '22'], key: 'Section #1' },
      { data: ['33', '44', '55', '66', '77'], key: 'Section #2' },
      { data: ['88'], key: 'Section #3' },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionGridList<string>
        RowSeparatorComponent={<View style={styles.rowSeparator} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeaderText}>{section.key}</Text>
        )}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        sections={sections}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'pink',
    height: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    minWidth: '30%',
  },
  rowSeparator: {
    height: Dimensions.get('window').width * 0.05,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
});
