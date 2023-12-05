import { type DefaultSectionT, type SectionListProps } from 'react-native';

export interface SectionGridListProps<Item, Section = DefaultSectionT>
  extends Omit<
    SectionListProps<Item>,
    | 'CellRendererComponent'
    | 'getItem'
    | 'getItemLayout'
    | 'keyExtractor'
    | 'renderItem'
    | 'renderSectionHeader'
    | 'renderSectionFooter'
  > {
  RowSeparatorComponent?: SectionListProps<Item>['SectionSeparatorComponent'];
  keyExtractor?: (item: Item, index: number) => string;
  numColumns: number;
  renderItem: (info: {
    item: Item;
    index: number;
    section: Section;
  }) => React.ReactElement | null;
  renderSectionHeader?: (info: {
    section: Section;
  }) => React.ReactElement | null;
  renderSectionFooter?: (info: {
    section: Section;
  }) => React.ReactElement | null;
}
