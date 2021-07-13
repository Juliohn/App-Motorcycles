import React, { useState, useEffect,useRef } from 'react';
import { StatusBar,Button, Image, View, Platform, Alert ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm} from 'react-hook-form';



import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

import * as ImagePicker from 'expo-image-picker';

import { MotorcycleDTO } from '../../dtos/MotorcycleDto';
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
  id:number;
  name:string;
  price:number;
  avatar:string;
}

const schema = Yup.object().shape({
  name:Yup
  .string()
  .required('Name is required'),
  price:Yup
  .string()
  .typeError('Price require a money value')    
  .required('Price is required'),  
});

interface Params {
  motorcycle:MotorcycleDTO
}

export default function Edit(){
  const navigation = useNavigation();
  const route = useRoute();
  const {motorcycle} = route.params as Params;
  const priceRef = useRef();

  const [image, setImage] = useState(null);
  const [sending,setSending] = useState(false);
  const [id, setId] = useState(motorcycle.id);
  const [editMotorcycle, setEditMotorcycle] = useState(motorcycle);

  const {    
    setValue,
    control,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver:yupResolver(schema)
  });



  useEffect(() => {

    setValue('name',editMotorcycle.name);
    setValue('price',editMotorcycle.price);


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

  async function handleUpdate(form:FormObject){
    

    try {
      var editData = {        
        name:form.name,
        price:form.price.replace('$ ', '').replace(',', ''),
        avatar: image ? image.base64 :"",        
      }    
            
      setSending(true);
      const response = await api.put(`/motorcycles/${id}`,editData);  
      setSending(false);     
      Alert.alert(
        "",
        response.data.msg,
        [
          
          { text: "Ok", onPress: () =>  navigation.navigate('List',{action: 'refresh'})
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
            Edit Motorcicle
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


        <ButtonImageWrapper>
            <ButtonImage onPress={pickImage}>
              <ButtonImageTitle>
                Change Image
            </ButtonImageTitle>
            </ButtonImage>
            <Image source={{ uri:image ? image.uri : motorcycle.avatar_url }} style={{ width: 280, height: 132 }} />
          </ButtonImageWrapper>
                 
      </Fields>

      {sending ? <Load /> :
       <SendButton title="Update" onPress={handleSubmit(handleUpdate)}/> 
      }
          
    </Form>
     
  </Container>
  </TouchableWithoutFeedback>
 );
}