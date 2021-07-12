import React from 'react';
import { TextInputProps } from 'react-native';
import { Control,Controller } from 'react-hook-form';


import {
 Container, 
 Error,
 InputFormMask
} from './styles';

interface Props extends TextInputProps {
  control:Control;
  name:string;
  error:string;
}
export default function InputFormMoney({
  control,
  name,
  error,
  ...rest}:Props){
 return (
  <Container>
    <Controller
        control={control}
        render={({field:{onChange,value}}) => (
          <InputFormMask 
          type={'money'}
          options={{
            precision: 2,
            separator: '.',
            delimiter: ',',
            unit: '$  ',
            suffixUnit: '',
          }}
            onChangeText={onChange}
            value={value}
          {...rest}/>   
        )}               
        name={name}
      /> 
      {error && <Error>{ error }</Error>}
  </Container>
 );
}