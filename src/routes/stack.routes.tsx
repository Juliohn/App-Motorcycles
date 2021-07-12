import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from '../pages/ListMotorcycles';
import Details from '../pages/DetailsMotorcycles';
import New from '../pages/NewMotorcycle';
import Edit from '../pages/EditMotorcycle';
import NewStock from '../pages/NewStock';

const {Navigator , Screen} = createStackNavigator();

export function StackRoutes(){
  return (
    <Navigator headerMode="none">
                    
      <Screen
      name="List"
      component={List}
      />

      <Screen
      name="Details"
      component={Details}
      />

      <Screen
        name="New"
        component={New}
      />

      <Screen
        name="Edit"
        component={Edit}
      />

      <Screen
        name="NewStock"
        component={NewStock}
      />


  
      
    </Navigator>
  )
}