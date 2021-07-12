import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
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