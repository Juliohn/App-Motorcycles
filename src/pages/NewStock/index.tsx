import React,{ useState } from 'react';
import { Alert,Keyboard, StatusBar,TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import BackButton from '../../components/BackButton';
import InputForm from '../../components/Form/InputForm';
import Button from '../../components/Form/Button';
import OperationTypeButton from '../../components/Form/OperationTypeButton';

import { MotorcycleDTO } from '../../dtos/MotorcycleDto';


import {
 Container,
 BackWrapper,
 Header,
 TitleWrapper,
 Title,
 Form,
 Fields,
 SubtitleWrapper,
 Subtitle,
 OperationTypes
} from './styles';

import { api } from '../../services/api';

interface FormData {
   quantity:number;
}

interface Params {
  motorcycle:MotorcycleDTO
}

const schema = Yup.object().shape({
  quantity:Yup
  .number()
  .typeError('Quantity require a numeric value')  
  .positive('Accept only quantity positive')
  .required('Quantity is required')
});

export default function New(){
  const navigation = useNavigation();
  const route = useRoute();
  const {motorcycle} = route.params as Params;

  const [ operationType, setOperationType] = useState('');
  const [referenceMotorcycle, setReferenceMotorcycle] = useState(motorcycle);

  const {
    control,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver:yupResolver(schema)
  });

  function handleBack(){    
    navigation.goBack();
  }

  function handleOperationTypeSelect(type: 'up' | 'down'){
    setOperationType(type)
  }

  async function handleSave(form:FormData){

    if(!operationType){
      Alert.alert('SELECT ONE TYPE (In/Out)')
      return;
    }

    try {
      const newData = {
        motorcycle_id:referenceMotorcycle.id,
        quantity:form.quantity,
        operation: operationType == 'up' ? 1 : 2
      }           
      
      const response = await api.post('/stock-motorcycles',newData); 
      
      const { data } = response;      

      Alert.alert(
        "",
        data.msg,
        [
          
          { 
            text: "Ok", onPress: () => data.error ? '' :
             navigation.navigate('Details',{
              action: 'refresh',
              motorcycle:motorcycle
            })
         }
        ],        
      );  

    } catch (error) {
      console.log(error);
    }
    
  }

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>    
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
        />
      <Header>

        <BackWrapper>
            <BackButton onPress={handleBack} />
        </BackWrapper>

        <TitleWrapper>
          <Title>
            New Stock 
          </Title>
        </TitleWrapper>
      </Header>

      <SubtitleWrapper>
          <Subtitle>
           {referenceMotorcycle.name}
          </Subtitle>
          </SubtitleWrapper>

      <Form>        
        <Fields>      
          <OperationTypes>
            <OperationTypeButton 
            onPress={() => {
              handleOperationTypeSelect('up')
            }}
            type="up" 
            title="In"
            isActive={operationType === "up"}
            />  
            <OperationTypeButton
            onPress={() => {
              handleOperationTypeSelect('down')
            }}           
            type="down"
            title="Out"
            isActive={operationType === "down"}
            />  
          </OperationTypes>
          <InputForm
            name="quantity"
            control={control}
            placeholder='Quantity'
            keyboardType="numeric"
            error={errors.quantity && errors.quantity.message}/>   
        </Fields>
        <Button onPress={handleSubmit(handleSave)} title="Save" /> 
      </Form>
      
    </Container>
  </TouchableWithoutFeedback>
 );
}