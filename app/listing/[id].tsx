import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('id', id);
  return (
    <View>
        <Text>Listing</Text>
    </View>
  );
}

export default Page;