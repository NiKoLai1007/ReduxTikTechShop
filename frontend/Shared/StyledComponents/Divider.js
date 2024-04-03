import React from 'react';
import { View } from 'react-native';

const Divider = ({ style }) => {
  return (
    <View
      style={[
        {
          borderBottomColor: 'black',
          borderBottomWidth: 3,
          marginVertical: 14,
        },
        style,
      ]}
    />
  );
};

export default Divider;
