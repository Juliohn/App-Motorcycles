import React, { useState, useEffect } from 'react';
import { StatusBar,Button, Image, View, Platform, Alert ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import * as ImagePicker from 'expo-image-picker';


import InputForm from '../../components/Form/InputForm';
import InputFormMoney from '../../components/Form/InputFormMoney';
import SendButton from '../../components/Form/Button';
import BackButton from '../../components/BackButton'
import  Load  from '../../components/Load';

import {
 Container,
 BackWrapper,
 Header,
 TitleWrapper,
 Title,
 Form,
 Fields,
 ButtonImageWrapper,
 ButtonImage,
 ButtonImageTitle
} from './styles';

import { api } from '../../services/api';

interface FormObject {
  name:string;
  price:number;
  quantity:number;
}

const schema = Yup.object().shape({
  name:Yup
  .string()
  .required('Name is required'),
  price:Yup
  .string()
  .typeError('Price require a money value')    
  .required('Price is required'),
  quantity:Yup
  .number()
  .typeError('Initial Stock require a numeric value')  
  .positive('Accept only initial stock positive')
  .required('Initial Stock is required')
});

export default function New(){
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [sending,setSending] = useState(false);

  const {
    control,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver:yupResolver(schema)
  });


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });        

    if (!result.cancelled) {
      setImage(result);
    }
  };

  function handleBack(){    
    navigation.goBack();
  }

  async function handleSave(form:FormObject){
    if(!image){
      Alert.alert('Image is required');
      return;
    }
    
    try {
      const newData = {
        name:form.name,        
        price:form.price.replace('$ ', '').replace(',', ''),
        quantity:form.quantity,   
        avatar:image.base64
      }           

      setSending(true);
      const response = await api.post('/motorcycles',newData);  
      setSending(false);
      const { data } = response;  

      Alert.alert(
        "",
        data.msg,
        [          
          {
             text: "Ok", onPress: () => data.error ? '' : navigation.navigate('List',{action: 'refresh'})
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
            New Motorcicle
          </Title>
        </TitleWrapper>
      </Header>

    <Form>
      <Fields>        

        <InputForm
          name="name"
          control={control}
          placeholder='Name'          
          error={errors.name && errors.name.message}/>   

        <InputFormMoney
          name="price"
          control={control}
          placeholder='Price'          
          error={errors.price && errors.price.message}/>                  

          <InputForm
          name="quantity"
          control={control}
          placeholder='Initial Stock' 
          keyboardType="numeric"         
          error={errors.quantity && errors.quantity.message}/>    

          <ButtonImageWrapper>
            <ButtonImage onPress={pickImage}>
              <ButtonImageTitle>
                Select Image
            </ButtonImageTitle>
            </ButtonImage>
            {image && <Image source={{ uri: image.uri }} style={{ width: 280, height: 132 }} />}
          </ButtonImageWrapper>

                 
      </Fields>


      {sending ? <Load /> :
       <SendButton title="Save" onPress={handleSubmit(handleSave)}/> 
      }
    </Form>
     
  </Container>
  </TouchableWithoutFeedback>
 );
}