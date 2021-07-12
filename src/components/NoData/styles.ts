import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  top: 20%;     
  justify-content: center;  
  align-items: center;   
`;

export const Message = styled.Text` 
  justify-content: flex-end;
  font-size:${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color:${({theme}) => theme.colors.main};
`;
