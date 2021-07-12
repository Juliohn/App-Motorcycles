import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native'
import { MotorcycleDTO } from '../../dtos/MotorcycleDTO'

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background_primary};  
  flex:1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
  background-color: ${({theme}) => theme.colors.header};
`;

export const Title = styled.Text`  
  font-size:${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color:${({theme}) => theme.colors.title_light};
`;

export const MotorcycleList = styled(FlatList as new () => FlatList <MotorcycleDTO>).attrs({
  contentContainerStyle:{
    padding:18
  },
  showsVerticalScrollIndicator:false
})`
`;

export const NewWrapper = styled.View`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  position: absolute;  
  align-items: center;
  justify-content: center;
  right: ${RFValue(15)}px;
  top: 75%;
  background-color:${({theme}) => theme.colors.main};
  border-radius: 40px;  
  `;


