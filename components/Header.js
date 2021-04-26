import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

import iconHeader from '../assets/icon-header.png';

export default function Header(props){
    return(
    <View style={styles.header}>
        <View style={styles.logo}>
            <Image source={iconHeader} style={{ width: 75, height: 50 }} />
        </View>
        <View style={styles.balance}>
            <Text style={styles.label}>Your balance:</Text>
            <Text style={styles.balanceValue}>{props.balance.toFixed(4)}</Text>
        </View>
    </View>
    )
} 

const styles = StyleSheet.create({
    header:{
      backgroundColor:'#4A90E2',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:20,
      height:85,
      width:vw(100)
    },
    balance:{
      justifyContent:'center',
      alignItems:'center'
    },
    label:{
      color:'#ddd'
    },
    balanceValue:{
      color:'#fff',
      fontSize:18
    }
  });