import React, { useMemo } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SectionGridList } from 'rn-section-grid-list';

const SECTIONS = {
  'Section #1': { data: ['10', '11', '12'], color: '#EF5350' },
  'Section #2': { data: ['20', '21', '22', '23', '24'], color: '#42A5F5' },
  'Section #3': { data: ['30'], color: '#66BB6A' },
  'Section #4': {
    data: ['40', '41', '42', '43', '44', '45', '46', '47'],
    color: '#FFCA28',
  },
};

export default function App() {
  const sections = useMemo(
    () => Object.entries(SECTIONS).map(([key, { data }]) => ({ key, data })),
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
        renderItem={({ item, section }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor:
                  SECTIONS[section.key as keyof typeof SECTIONS].color,
              },
            ]}
          >
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
