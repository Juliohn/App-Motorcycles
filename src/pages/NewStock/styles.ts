import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Dimensions ,FlatList} from 'react-native'

export const Container = styled.View`  
  flex:1;
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const BackWrapper = styled.View`  
  margin-left: ${RFValue(12)}px;
  margin-right: ${RFValue(70)}px;    
  margin-top: ${getStatusBarHeight() + 22}px;   
`;

export const Header = styled.View`  
  width:100%;  
  background-color: ${({theme}) => theme.colors.header};
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-start;  
  flex-direction: row;    
`;

export const TitleWrapper = styled.View`
  margin-top: ${getStatusBarHeight() + 22}px;   
  justify-content: center;  
  align-items: center; 
  margin-left: ${RFValue(22)}px;  
`;


export const Title = styled.Text`
  font-size:${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color:${({theme}) => theme.colors.title_light};
  `;

export const Form = styled.View`
  flex:1;
  width:100%;
  height: ${RFValue(113)}px;
  padding: ${RFValue(24)}px;  
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const OperationTypes = styled.View`
  flex-direction:row;
  justify-content: space-between;
  margin-bottom :  ${RFValue(16)}px;  
`;

export const SubtitleWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(25)}px;  
  margin-top:${RFValue(10)}px;    
  justify-content: center;  
  align-items: center;    
`;

export const Subtitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(20)}px;  
  `;
