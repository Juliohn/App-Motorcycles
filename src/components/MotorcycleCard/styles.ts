import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`  
  width: 100%;  
  height: ${RFValue(126)}px;  
  background-color: ${({theme}) => theme.colors.background_secondary};  
  flex-direction:row;
  justify-content:space-between;
  align-items: center;
  padding: ${RFValue(20)}px;
  margin-bottom: ${RFValue(16)}px;
  border-radius: 10px;  
`;

export const Details = styled.View`  
  justify-content:space-between;    
  margin-right: ${RFValue(10)}px;
`;

export const Code = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_datails};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
  `;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(17)}px;
  margin-top: ${RFValue(5)}px;  
  `;

export const Price = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.main};
  font-size: ${RFValue(20)}px;  
  margin-bottom: ${RFValue(5)}px;
  `;

export const QuantityStock = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_datails};
  font-size: ${RFValue(15)}px;`;

export const Avatar = styled.Image`
  width: ${RFValue(167)}px;
  height: ${RFValue(85)}px;  
`;