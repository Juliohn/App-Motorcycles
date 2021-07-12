import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';


import {
 Container,
 Title,
 Icon
} from './styles';


interface Props extends RectButtonProps{
  title:string
  type:'edit' | 'details' | 'delete'
};

const icons = {
  edit:"edit",
  details:"double-arrow",
  delete:"delete-forever"
}


export default function SwipeDetailsButton({title,type,...rest} : Props){
 return (
  <Container type={type} {...rest}>
    <Icon type={type} name={icons[type]} />     
  </Container>
 );
}

