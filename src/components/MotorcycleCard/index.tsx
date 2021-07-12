import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MotorcycleDTO } from '../../dtos/MotorcycleDTO';

import {
 Container, 
 Details,
 Code,
 Name,
 Price,
 QuantityStock,
 Avatar,
} from './styles';


interface Props extends RectButtonProps{
 data:MotorcycleDTO
}

export function MotorcycleCard({data, ...rest} : Props){
 return (
  <Container {...rest}>
    <Details>
      <Code>{data.code}</Code> 
      <Name>{data.name}</Name>
      <Price>{data.price}</Price>
      <QuantityStock> {`${data.stock} em estoque`}</QuantityStock>      
    </Details>
     <Avatar
      resizeMode="contain"
      source={{uri:data.avatar_url}} />
  </Container>
 );
}