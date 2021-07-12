import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`  
   width: 100%; 
`;

export const Error = styled.Text`
  color:${({theme}) => theme.colors.main};
  font-size:${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  margin-bottom  :6px ;
`;

export const InputFormMask = styled(TextInputMask)`
  width: 100%;
  padding:${RFValue(18)}px ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;
  border:0.5px solid;
  background-color: ${({theme}) => theme.colors.background_secondary};
  border-radius:${RFValue(5)}px;
  margin-bottom:${RFValue(8)}px;  
  color: ${({theme}) => theme.colors.text_dark};
`;
