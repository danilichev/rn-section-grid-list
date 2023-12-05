import React, { useCallback, useMemo } from 'react';
import { SectionList, View, type DefaultSectionT } from 'react-native';

import { type SectionGridListProps } from './SectionGridList.types';
import { styles } from './SectionGridList.styles';

export const SectionGridList = <Item,>({
  RowSeparatorComponent,
  keyExtractor,
  numColumns,
  renderItem,
  ...props
}: SectionGridListProps<Item>) => {
  const splitToChunks = useCallback(
    (arr: readonly Item[], chunksNumber: number) =>
      [...Array(Math.ceil(arr.length / chunksNumber)).keys()].map((i) =>
        arr.slice(i * chunksNumber, i * chunksNumber + chunksNumber)
      ),
    []
  );

  const sections = useMemo(
    () =>
      props.sections.map((section) => ({
        data: splitToChunks(section.data, numColumns),
        key: section.key,
      })),
    [numColumns, props.sections, splitToChunks]
  );

  const extractKey = useCallback(
    (item: Item, index: number) =>
      typeof keyExtractor === 'function'
        ? keyExtractor(item, index)
        : index.toString(),
    [keyExtractor]
  );

  const renderItemsRow = useCallback(
    (info: { item: Item[]; index: number; section: DefaultSectionT }) => (
      <>
        <View style={styles.container}>
          {info.item.map((i, index) => (
            <View key={extractKey(i, index)}>
              {renderItem({ item: i, index, section: info.section })}
            </View>
          ))}
          {info.index === info.section.data.length - 1 &&
          info.item.length !== numColumns
            ? [
                ...Array(numColumns - (info.item.length % numColumns)).keys(),
              ].map((_, ind) => (
                <View
                  key={`hidden-${ind}`}
                  pointerEvents="none"
                  style={styles.hidden}
                >
                  {renderItem({
                    item: info.item[0] as Item,
                    index: ind,
                    section: info.section,
                  })}
                </View>
              ))
            : null}
        </View>
        {RowSeparatorComponent ? RowSeparatorComponent : null}
      </>
    ),
    [RowSeparatorComponent, extractKey, numColumns, renderItem]
  );

  return (
    <SectionList<Item[]>
      {...props}
      ListHeaderComponent={props.ListHeaderComponent}
      contentContainerStyle={props.contentContainerStyle}
      renderItem={renderItemsRow}
      renderSectionHeader={props.renderSectionHeader}
      renderSectionFooter={props.renderSectionFooter}
      sections={sections}
    />
  );
};
