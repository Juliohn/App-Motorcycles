import React from 'react';
import {ViewProps} from 'react-native';

import {
 Container,  
 Quantity, 
 Operation, 
 Date,
} from './styles';

import { MotorcycleStockDTO } from '../../dtos/MotorcycleStockDTO';

interface Props extends ViewProps{  
  data:MotorcycleStockDTO;
  type: 'in' | 'out';
}


export default function StockHistoryCard({ data, type} : Props){  
 return (
  <Container type={type}>        
    <Operation>{data.operation_show}</Operation>
    <Quantity>{data.quantity}</Quantity>
    <Date>{data.date}</Date>
  </Container>
 );
}