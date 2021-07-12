import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import {
 Container,
 Icon,
 Title
} from './styles';

interface Props extends TouchableOpacityProps{
  title:string;
  type: 'up' | 'down';
  isActive:boolean;
}

const icons = {
  up:"arrow-circle-up",
  down:"arrow-circle-down",
}

export default function OperationTypeButton({type, title,isActive, ...rest}:Props){
 return (
  <Container 
    isActive={isActive}
    type={type}
    {...rest}  >
    <Icon type={type} name={icons[type]} />
     <Title>
       {title}
     </Title>
  </Container>
 );
}