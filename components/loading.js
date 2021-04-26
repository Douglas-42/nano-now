import React from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { StyleSheet, View, Image } from 'react-native';
import loadingGif from '../assets/loading.gif'; 

export default function Loading(){
    return(
        <View style={styles.loading}>
            <Image source={loadingGif} style={{ width: 324, height: 316 }} />
        </View>
    )
}

const styles = StyleSheet.create({
  loading:{
    flex:1,
    width:vw(100),
    backgroundColor:'#fff',
    paddingTop:50,
    justifyContent:'space-between',
    alignItems:'center'
  },

});
