import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons'

interface Props {
  type: 'edit' | 'details' | 'delete';
}



export const Container = styled(RectButton)<Props>`
  width:  ${RFValue(60)}px;
  height: ${RFValue(126)}px;   
  flex-direction:row;
  justify-content:center;
  align-items: center;
  padding: ${RFValue(10)}px;    

  ${({type}) =>type === 'details' && css`
      background-color: ${({theme}) => theme.colors.title};
 ` }

 ${({type}) =>type === 'edit' && css`
      background-color: ${({theme}) => theme.colors.header};
 ` }

 ${({type}) =>type === 'delete' && css`
      background-color: ${({theme}) => theme.colors.main};
 ` }

`;

export const Title = styled.Text`
  font-size:${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.title};    
  `;


export const Icon = styled(MaterialIcons)<Props>`
font-size:${RFValue(24)}px;
margin-right:${RFValue(12)}px;
color:${({theme,type}) =>theme.colors.title_light};
`;