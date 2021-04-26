import React from 'react';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function Mission(props){
    return(
        <View style={styles.option}>
            <Text style={styles.optionTitle}>
            Mission:
            </Text>
            <Text style={styles.optionDesc}>
            {props.mission}
            </Text>
            <Text style={styles.optionTitle}>
            Reward:
            </Text>
            <Text style={styles.optionDesc}>
            {props.reward}
            </Text>
            <Button
            onPress={() => Alert.alert(
                'Mission',
                'Watch ad now?',
                [
                {text: 'Watch now', onPress: () => props.Start()},
                {text: 'Cancel', onPress: () => console.log('Cancel')},
                ],
                { cancelable: false }
            )}
            title="Watch now"
            color="#4A90E2"
            accessibilityLabel="Watch ad to earn Nano"
            />
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