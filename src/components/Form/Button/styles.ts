import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.success};  
  border-radius: ${RFValue(5)}px;
  align-items: center;
  padding: ${RFValue(18)}px;
`;
export const Title = styled.Text`
  font-size:${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.title_light};    
  `;