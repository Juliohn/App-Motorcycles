import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import {Dimensions ,FlatList} from 'react-native'

export const Container = styled.View`
  flex:1;
  background-color: ${({theme}) => theme.colors.background_secondary};  
`;

export const BackWrapper = styled.View`
  margin-top: ${getStatusBarHeight() + 22}px;
  margin-left: 12px;
  margin-right: ${RFValue(95)}px;    
`;
// export const Header = styled.View`
//   flex-direction:row;
//   justify-content: space-between;
//   align-items: center;    
// `;
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
  margin-left: ${RFValue(8)}px;  
`;


export const Title = styled.Text`
  font-size:${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color:${({theme}) => theme.colors.title_light};
  `;

export const Button = styled.View`
    margin-left:15px;    
`;

export const AvatarWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;  
  justify-content: center;  
  align-items: center;
  margin-top: ${getStatusBarHeight()}px;  
`;

export const Avatar = styled.Image`  
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;  
`;


export const Details = styled.View`  
  justify-content:center;      
  align-items: center;
  margin-top:${RFValue(5)}px;  
  padding:${RFValue(12)}px;  
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


export const SubtitleWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(25)}px;  
  margin-top:${RFValue(10)}px;  
  margin-bottom:${RFValue(10)}px;  
  justify-content: center;  
  align-items: center;    
`;



export const Subtitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(20)}px;  
  `;

export const HistoryList = styled(FlatList).attrs({
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
  top: 85%;
  background-color:${({theme}) => theme.colors.main};
  border-radius: 40px;  
  `;