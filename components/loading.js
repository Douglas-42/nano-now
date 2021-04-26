import React from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { StyleSheet, View, Image } from 'react-native';
import loadingGif from '../assets/loading.gif'; 
import Constants from 'expo-constants';
import {
    AdMobBanner
} from 'expo-ads-admob';

export default function Loading(){
    const testID = 'ca-app-pub-7892796119645465/1061874386';
    const productionID = 'ca-app-pub-7892796119645465/9164312411';
    const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;
    return(
        <View style={styles.loading}>
            <Image source={loadingGif} style={{ width: 324, height: 316 }} />
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds={false}
                onDidFailToReceiveAdWithError={e=>console.log(e)} />
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