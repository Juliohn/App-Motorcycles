import React, {useEffect,useState, useRef} from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

import { StatusBar ,ActivityIndicator, Alert} from 'react-native';

import { MotorcycleCard } from '../../components/MotorcycleCard';
import  Load  from '../../components/Load';
import NewButton from '../../components/NewButton'
import NoData from '../../components/NoData'
import SwipeActionButton from '../../components/SwipeActionButton'

import { MotorcycleDTO } from '../../dtos/MotorcycleDTO';
import {
  Container,  
  Header,
  Title, 
  MotorcycleList,  
  NewWrapper,  
} from './styles';
import { api } from '../../services/api';

export default function ListData() {

  const swipeableRef = useRef();

  const [motorcycles,setMotorcycles] = useState<MotorcycleDTO[]>([]);
  const [noData,setNoData] = useState(false);
  const [loading,setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const { params }  = route;

  let row: Array<any> = [];
  let prevOpenedRow;
  
  if (params !== undefined) {
    if (params.action === 'refresh') {        
        refresh();        
        params.action = null;        
    }  
  }
  
  useEffect(() => {
    setLoading(true);
    loadData(1);
  },[])

  async function loadData(page = 1){
    try {

      const response = await api.get(`/motorcycles?page=${page}`);
      const {data} = response;
      setPage(2);
      setMotorcycles(data.data);
      setLastPage(data.last_page)            
       if(data.data.length == 0){
         setNoData(true)
       }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }        
  }

  async function loadMoreData() {
    if (loadingMore) {
      return;
    }

    if (page <= lastPage) {
      setLoadingMore(true);      
      const response = await api.get(`/motorcicles?page=${page}`);     
      setMotorcycles([...motorcycles, ...response.data.data]);
      setLoadingMore(false);
      setPage(page + 1);
    }
  };

  async function refresh(){     
    loadData(1);
  }

  function renderFooter(){
    if (!loadingMore) {
      return null;
    }
    return (
      <>
        <ActivityIndicator size="small" color="#000000" />
      </>
    );
  };
  
  function handleDetailsMotorcycle(motorcycle:MotorcycleDTO){        
    navigation.navigate('Details',{
      motorcycle
    });
  }

  function handleDeleteMotorcycle(motorcycle:MotorcycleDTO){        
    
    Alert.alert(
      "",
      "Delete "+ motorcycle.name +" ?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleDeleteMotorcycleConfirmed(motorcycle) }
      ],
      { cancelable: false }
    );
  }

  async function handleDeleteMotorcycleConfirmed(motorcycle:MotorcycleDTO){
    try {
      const response = await api.delete(`/motorcycles/${motorcycle.id}`);  
      Alert.alert(
        "",
        response.data.msg,
        [
          
          { text: "Ok", onPress: () => refresh() }
        ],        
      );      
    } catch (error) {
      console.log(error)
    }
  }

  function handleEditMotorcycle(motorcycle:MotorcycleDTO){        
    navigation.navigate('Edit',{
      motorcycle,                 
    });
  }

  function handleNewMotorcycle(){
    navigation.navigate('New');
  }
  
  const leftSwipeActions = (item) => {
    return (
      <>
        <SwipeActionButton title="Delete" type="delete" onPress={() =>handleDeleteMotorcycle(item)} />
        <SwipeActionButton title="Details" type="details" onPress={() =>handleDetailsMotorcycle(item)} />
        <SwipeActionButton title="Edit" type="edit" onPress={() =>handleEditMotorcycle(item)} />                
      </>
    );
  };
 

  function closeRow(index) {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
		prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
}
  
  return (
    <Container>
      <StatusBar
      barStyle='light-content'
      backgroundColor="transparent"
      translucent
       />

      <Header>
        <Title>TNB - Motorcycles</Title>
      </Header>

    { loading ? 
      <Load /> :
      noData ? (
        <NoData message="Motorcycle not found" />
      ):
      (

        <MotorcycleList
          data={motorcycles}
          keyExtractor={item => String(item.id)} 
          renderItem={({item,index}) => 
            <Swipeable                                 
              renderLeftActions={() => leftSwipeActions(item)}  
              onSwipeableOpen={closeRow(index)}             
            >
              <MotorcycleCard data={item} />
            </Swipeable>
          }
          refreshing={false}
          onRefresh={refresh}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreData}
          ListFooterComponent={renderFooter}     
        />
      )}

      <NewWrapper>
        <NewButton color="#FFFFFF" onPress={handleNewMotorcycle} />
      </NewWrapper>
    </Container>      
    );
}