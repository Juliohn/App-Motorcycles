import React, {useEffect,useState, useRef} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Swipeable } from 'react-native-gesture-handler';
import { StatusBar ,ActivityIndicator, Alert} from 'react-native';

import BackButton from '../../components/BackButton'
import NewButton from '../../components/NewButton'
import StockHistoryCard  from '../../components/StockHistoryCard';
import SwipeActionButton from '../../components/SwipeActionButton'
import  Load  from '../../components/Load';
import NoData from '../../components/NoData'

import { MotorcycleDTO } from '../../dtos/MotorcycleDto';
import { MotorcycleStockDTO } from '../../dtos/MotorcycleStockDTO';

import {
 Container,
 TitleWrapper,
 Title,
 Header, 
 AvatarWrapper,
 Avatar,
 Subtitle,
 SubtitleWrapper,
 Details,
 Code,
 Name,
 Price,
 QuantityStock,
 HistoryList,
 BackWrapper,
 NewWrapper,
} from './styles';

import { api } from '../../services/api';

interface Params {
  motorcycle:MotorcycleDTO
}

export default function Detail(){

  const navigation = useNavigation();
  const route = useRoute();

  const { params }  = route;
  const {motorcycle} = route.params as Params;
  
  if (params !== undefined) {
    if (params.action === 'refresh') {               
        refresh();        
        params.action = null;        
    }  
  }  
  
  
  const [stock, setStock] = useState(motorcycle.stock);
  const [noData,setNoData] = useState(false);
  const [loading,setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingStock,setLoadingStock] = useState(false);
  const [motorcycleStock,setMotorcycleStock] = useState<MotorcycleStockDTO[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const leftSwipeActions = (item) => {
    return (
      <>
        <SwipeActionButton title="Delete" type="delete" onPress={() =>handleDeleteStockMotorcycle(item)} />                     
      </>
    );
  };

  useEffect(() => {  
    setLoading(true);
    loadData(1);
  },[])

  async function loadData(page = 1){
    try {      
      const response = await api.get(`/list-stock-motorcycle/${motorcycle.id}?page=${page}`);
      const {data} = response;
      setPage(2);
      setMotorcycleStock(data.data);
      setLastPage(data.last_page) ;      
      
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
      const response = await api.get(`/list-stock-motorcycle/${motorcycle.id}?page=${page}`); 
      setMotorcycleStock([...motorcycleStock, ...response.data.data]);
      setLoadingMore(false);
      setPage(page + 1);
    }
  };

  async function refresh(){    
    refreshStock(); 
    loadData(1);
  }

  async function refreshStock(){                
      const response = await api.get(`/motorcycles/${motorcycle.id}`);       
      setStock(response.data.stock);      
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

  function handleDeleteStockMotorcycle(stock_motorcycle:MotorcycleStockDTO){            
    Alert.alert(
      "",
      "Delete this "+ stock_motorcycle.operation_show+" of the "+stock_motorcycle.quantity+ " item(s) ?" ,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleDeleteStockMotorcycleConfirmed(stock_motorcycle) }
      ],
      { cancelable: false }
    );
  }

  async function handleDeleteStockMotorcycleConfirmed(stock_motorcycle:MotorcycleStockDTO){
    try {
      const response = await api.delete(`/stock-motorcycles/${stock_motorcycle.id}`);  
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

  function handleBack(){    
    navigation.goBack();
  }

  function handleNewMotorcycleStock(){
    navigation.navigate('NewStock',{
      motorcycle
    });
  }

 return (
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
               Details
            </Title>
          </TitleWrapper>
     </Header>
     <AvatarWrapper>
          <Avatar source={{
            uri:motorcycle.avatar_url
          }}
          resizeMode="contain"
        />
          </AvatarWrapper>   

     <Details>
      <Code>{motorcycle.code}</Code> 
      <Name>{motorcycle.name}</Name>
      <Price>{motorcycle.price}</Price>

      {loadingStock ? 
        <Load /> :
        <QuantityStock> {`${stock} in stock`}</QuantityStock>
      }
    </Details>

    <SubtitleWrapper>
      <Subtitle>Stock History</Subtitle>
    </SubtitleWrapper>

    { loading ? 
      <Load /> :      
      noData ? (
        <NoData message="Stock not found" />
      ) :
      (
      <HistoryList
          data={motorcycleStock}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) =>
            <Swipeable                               
                renderLeftActions={() => leftSwipeActions(item)}               
              >
                <StockHistoryCard
                  data={item}
                  type={item.operation == 1 ? 'in' : 'out' }
                  />
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
        <NewButton color="#FFFFFF" onPress={handleNewMotorcycleStock} />
      </NewWrapper>
     
  </Container>
 );
}