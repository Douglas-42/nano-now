import React from 'react';
import {Button, Alert} from 'react-native';
import DisableButton from './DisabledButton';

export default function WithdrawButton(props){
    return(
    <>
    {
        props.lastWithdraw <= 0?
            (
                <Button
                    onPress={() => Alert.alert(
                    'Withdraw',
                    'You can only withdraw one time each day. Do you want to withdraw now?',
                    [
                        {text: 'Yes, withdraw now', onPress: () => props.Withdraw()},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                    )}
                    title="Withdraw"
                    color="#000034"
                    accessibilityLabel="withdraw your Nano."
                />
            ):
            (
                <DisableButton count={props.lastWithdraw} />
            )
    }
    </>  
)};