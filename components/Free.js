import React from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import ClaimButton from './ClaimButton';

export default function Free(props){
    return(
        <View style={styles.option}>
            <Text style={styles.optionTitle}>
            Free Daily Reward:
            </Text>
            <Text style={styles.optionDesc}>
            Every day free Nano for you
            </Text>
            <Text style={styles.optionTitle}>
            Reward:
            </Text>
            <Text style={styles.optionDesc}>
            {props.reward}
            </Text>
            <ClaimButton claim={props.claim} lastClaim={props.lastClaim}/>
        </View>
    )
}

const styles = StyleSheet.create({
  option:{
    width:vw(90),
    backgroundColor:'#fff',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    marginTop:15,
    marginBottom:15
  },
  optionTitle:{
    fontSize:18,
    fontWeight:'600',
    color:'#000034'
  },
  optionDesc:{
    color:'#676686',
    fontSize:16,
    marginBottom:10
  },

});