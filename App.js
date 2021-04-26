import { StatusBar } from 'expo-status-bar';
import isValid from 'nano-address-validator';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, BackHandler  } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Free from './components/Free';
import api from './api/index'
import Loading from './components/loading';
import Header from './components/Header';
import WithdrawButton from './components/WithdrawButton';

export default function App() {
  const [balance,setBalance] = useState(0)
  const [isLogged,setIsLogged] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [lastWithdraw,setLastWithdraw] = useState(0)
  const [lastClaim,setLastClaim] = useState(0)
  const [walletAddress,setWalletAddress] = useState('')
  
  function storeData(value) {
    AsyncStorage.setItem("wallet", String(value))
      .then(() => {
      })
      .catch((e) => {
        alert("Error saving to AsyncStorage:" + JSON.stringify(e));
      });
  }
  function getData() {
    AsyncStorage.getItem("wallet")
      .then((value) => {
        setWalletAddress(value);
        if(isValid(value))
          ChangeWallet()
      })
      .catch((e) => {
        console.log("Error reading from AsyncStorage: " + e);
        setWalletAddress('');
      });
  }
  function ClaimFree(){
    api.post('/free',{id:"DR000",wallet:walletAddress}).then(
      (res)=>{
        if(res.data.error){
          alert(res.data.error)
        }
        else{
          alert(res.data.msg)
          getData();
        }
        
      }
    ).catch(
      (err)=>{
        alert('Error starting mission, try again')
      }
    )
  }
  function Withdraw(){
    setIsLoading(true);
    api.post('/withdraw',{wallet:walletAddress}).then(
      (res)=>{
        if(res.data.error){
          alert(res.data.error)
          setIsLoading(false)
        }
        else{
          getData();
          alert("Successful withdrawal");
          setIsLoading(false)
        }
        
      }
    ).catch(
      (err)=>{
        alert('Error withdrawing, try again.')
        setIsLoading(false)
      }
    )
  }
  
  function ChangeWallet(){
    if(!isValid(walletAddress)) return;
    storeData(walletAddress);
    api.get(`/?wallet=${walletAddress}`).then(
      (res)=>{
        const _data = res.data;
        let _balance = Number(_data.balance);
        if(isNaN(_balance) || _balance < 0.00001)
        {
          _balance = 0
        }
        setBalance(_balance)
        setIsLogged(true);
        //Get the time of last withdraw and add 1 days then subtract the current date
        setLastWithdraw((_data.withdraw+(1000*60*60*24))-Date.now())
        //Get the time of last claim and add 1 days then subtract the current date
        setLastClaim((_data.lastClaim+(1000*60*60*24))-Date.now())
      }
    ).catch(function (error) {
      Alert.alert(
        'Error',
        `We are having a problem connecting to the server, try again later`,
        [
        {text: 'Ok, I understand', onPress: () => {BackHandler.exitApp()}},
        ],
        { cancelable: false }
      );
    });
  }
  useEffect(()=>{
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header balance={balance} />
      {isLoading?<Loading /> 
      :(<View style={styles.body}>
        <View style={styles.wallet}>
          <Text style={styles.walletLabel} >
            Your wallet address:
          </Text>
          <TextInput
            editable
            maxLength={65}
            style={styles.input}
            onChangeText={text=>{setWalletAddress(text); setIsLogged(false);}}
            defaultValue={walletAddress}
          />
          {
            !isLogged?(<Button
              onPress={() => {
                
                Alert.alert(
                'Set Wallet Address',
                `'${walletAddress}' is this address correct?`,
                [
                  {text: 'Yes, continue', onPress: () => {isValid(walletAddress)?ChangeWallet():alert('Invalid wallet address!')}},
                  {text: 'No, I will change', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
              );}}
              title="Continue"
              color="#47ad53"
              accessibilityLabel="Continue"
            />)
          :(
            <WithdrawButton lastWithdraw={lastWithdraw} Withdraw={Withdraw} />
           )
        }
        </View>
        <ScrollView>
          {!isLogged?(<View style={styles.warningPanel}>
            <Text style={styles.warningText} >
              1. Put your wallet address on the input above
            </Text>
            <Text style={styles.warningText} >
              2. Press Continue
            </Text>
          </View>)
        :(<View style={styles.earnSection}>
                <View style={styles.TitleSub}>
                  <Text style={styles.earnTitle}>
                    Earn Nano for free!
                  </Text>
                  <Text style={styles.SubTitle}>
                    ( New rewards every day. )
                  </Text>
                </View>
              <Free
                reward={"0.0001"}
                claim={ClaimFree}
                lastClaim={lastClaim}
              />
        </View>)}
        </ScrollView>
      </View>)}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor:'#16151c',
    justifyContent: 'space-between',
  },
  body:{
    flex:1,
  },
  warningPanel:{
    height:400,
    justifyContent:'center',
    alignItems:'center'
  },
  warningText:{
    color:'#eee',
    fontSize: 16,
    marginBottom: 10,
    marginTop:10
  }, 
  wallet:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#d7e7fa',
    alignSelf: 'stretch',
    width:vw(100),
    paddingTop:15,
    paddingBottom:15
  },
  walletLabel:{
    fontSize:20,
    fontWeight:'600',
    color:'#000034',
    marginBottom:10
  },
  input:{
    borderWidth:2,
    borderRadius:5,
    borderColor:'#fff',
    backgroundColor:'#eee',
    borderColor:'#4A90E2',
    width:300,
    height:30,
    marginBottom:15,
    paddingLeft:10
  },
  earnSection:{
    width:vw(100),
    height:420,
    flex:1,
    backgroundColor:'#16151c',
    justifyContent:'space-evenly',
    alignItems:'center',
    paddingTop:15,
    paddingBottom:15
  },
  earnTitle:{
    fontSize:25,
    color:'#ffc403'
  },
  TitleSub:{
    justifyContent:'center',
    alignItems:'center'
  },
  SubTitle:{
    fontSize:14,
    fontWeight:'400',
    color:'#eee'
  },

});
