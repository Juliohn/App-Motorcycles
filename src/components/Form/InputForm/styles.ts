import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`  
  width: 100%;  
`;

export const Error = styled.Text`
  color:${({theme}) => theme.colors.main};
  font-size:${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  margin-bottom  :6px ;
`;
