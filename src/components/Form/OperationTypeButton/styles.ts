import styled, { css } from 'styled-components/native';
import {TouchableOpacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import {MaterialIcons} from '@expo/vector-icons'

interface IconsProps {
  type: 'up' | 'down';
}
interface ContainerProps {
  isActive:boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
 width: 48%;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 
 border-width: ${({isActive}) => isActive ? 0 : 0.5}px;
 border-style: solid;
 border-color:  ${({theme}) => theme.colors.text}; 

 border-radius: 5px;
 padding: ${RFValue(16)}px; 

 ${({isActive,type}) => isActive && type === 'up' && css`
      background-color: ${({theme}) => theme.colors.success_light};
 ` }


 ${({isActive,type}) => isActive && type === 'down' && css`
      background-color: ${({theme}) => theme.colors.main_light};
 ` }

`;

export const Icon = styled(MaterialIcons)<IconsProps>`
  font-size:${RFValue(24)}px;
  margin-right:${RFValue(12)}px;

  color:${({theme,type}) =>
    type === "up"?
    theme.colors.success
    :
    theme.colors.main
  };
`;

export const Title = styled.Text`
  font-size:${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
`

