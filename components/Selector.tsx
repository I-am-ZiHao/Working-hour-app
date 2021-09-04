import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SelectorItemType } from '../common/type';

const styles = StyleSheet.create({});

export type SelectorProps = {
  items: SelectorItemType[];
  selectedValue: number | string;
  setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
};

const Selector = ({
  items,
  selectedValue,
  setSelectedValue,
}: SelectorProps) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
      style={{ width: '100%', height: '100%' }}
    >
      {items.map((item) => (
        <Picker.Item key={item.label} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default Selector;
