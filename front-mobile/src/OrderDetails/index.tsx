import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, Alert, Linking } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

type Props = {
  route: {
    params: {
      order: Order //o StackNavigator já cria por padrão umas props no componenete quando este está relacionado a uma rota. Route e params são um exemplo. Ao passar um dado para o componenete, fazer isso para recuperar
    }
  }
}

function OrderDetails({ route }: Props) {
  const { order } = route.params /* removendo o objeto order de dentro de route.params. Equivalente a const order = route.params.order */
  const navigation = useNavigation()

  const handleOnPressCancel = () => {
    navigation.navigate('Orders')
  }

  const handleOnPressConfirm = () => {
    confirmDelivery(order.id)
      .then(() => {
        Alert.alert(`Entrega do pedido ${order.id} confirmada com sucesso!`)
        navigation.navigate('Orders')
      })
      .catch(() => {
        Alert.alert(`Erro na confirmação do pedido ${order.id}`)
      })
  }

  const handleOnPressStartNavigation = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
  }

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={handleOnPressStartNavigation}>INICIAR NAVAGAÇÃO</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={handleOnPressConfirm}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={handleOnPressCancel}>VOLTAR</Text>
        </RectButton>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  }
})

export default OrderDetails