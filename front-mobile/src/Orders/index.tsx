import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard'
import { Order } from '../types';

function Orders() {
   const [orders, setOrder] = useState<Order[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const navigation = useNavigation()
   const isFocused = useIsFocused() //controla se o componente está na tela (focalizado) ou não. true(quando entra na tela) ou false(quando sia da tela)

   // técnica para renderização do componente utilizando o useIsFocused. 
   // Cria uma funcao de recuperar os dados que sempre será executada quando o componente foi inicializado (useEffect)
   // Como o isFocused foi inserido como dependencia do useEffect, sempre que seu valor for alterado, irá acionar o useEffect, fazendo o fetch dos dados
   const fetchData = () => {
      setIsLoading(true)
      fetchOrders()
         .then(response => setOrder(response.data))
         .catch(() => Alert.alert('Erro ao consultar API'))
         .finally(() => setIsLoading(false))
   }

   useEffect(() => {
      if (isFocused) {
         fetchData()
      }
   }, [isFocused])

   const handleOnPress = (order: Order) => {
      navigation.navigate('OrderDetails', {
         order //vai para o OrderDetails passando um order para o componente
      })
   }

   return (
      <>
         <Header />
         <ScrollView style={styles.container}>
            {isLoading ? (
               <Text>Buscando pedidos...</Text>
            ) :
               orders.map(order => (
                  <TouchableWithoutFeedback
                     key={order.id}
                     onPress={() => handleOnPress(order)} /* onPress, passa o order daquele card para o handleOnPress */
                  >
                     <OrderCard order={order} />
                  </TouchableWithoutFeedback>
               ))
            }
         </ScrollView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingRight: '5%',
      paddingLeft: '5%'
   }
})

export default Orders