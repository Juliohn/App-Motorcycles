import React from 'react';

import {
 Container,
 Message
} from './styles';

interface Props {
  message:string;
}

export default function NoData({message}:Props){
 return (
  <Container>
     <Message>
       {message}
     </Message>
  </Container>
 );
}