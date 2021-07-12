import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { View } from 'react-native';


interface Props {  
  type: 'in' | 'out';
}

export const Container = styled(View)<Props>`  
  width: 100%;  
  height: ${RFValue(126)}px;  
  background-color: ${({theme}) => theme.colors.background_secondary};  
  flex-direction:row;
  justify-content:space-between;
  align-items: center;
  padding: ${RFValue(20)}px;
  margin-bottom: ${RFValue(16)}px;
  border-radius: 10px;  
  border:0.5px solid;    

  ${({type}) => type === 'in' && css`
      border-color: ${({theme}) => theme.colors.success};
 ` }

 ${({type}) => type === 'out' && css`
      border-color: ${({theme}) => theme.colors.main_light};
 ` }

`;


export const Quantity = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_datails};
  font-size: ${RFValue(16)}px;  
  `;
export const Operation = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_datails};
  font-size: ${RFValue(16)}px;  
  `;

export const Date = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_datails};
  font-size: ${RFValue(16)}px;
  text-transform: uppercase;
  `;
