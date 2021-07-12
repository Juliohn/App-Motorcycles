import React from 'react';
import { MaterialIcons} from '@expo/vector-icons'
import {BorderlessButtonProps} from 'react-native-gesture-handler';

import {useTheme} from 'styled-components'

import {
 Container, 
} from './styles';

interface Props extends BorderlessButtonProps {
  color?:string;
}

export default function NewButton({color,...rest}:Props){
  const theme = useTheme();
 return (
  <Container {...rest}>
     <MaterialIcons 
     name="add"
     size={24}
     color={color?color:theme.colors.text}/>
  </Container>
 );
}