import React from 'react';
import {ActivityIndicator} from 'react-native'
import { useTheme } from 'styled-components';

import {
 Container,
 Title
} from './styles';

export default function Load(){
const theme = useTheme();
 return (
    <ActivityIndicator
      color={theme.colors.main}
      size="large"
      style={{flex:1}}
    />
 );
}