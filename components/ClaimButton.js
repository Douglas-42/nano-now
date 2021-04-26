import React from 'react';
import {Button, Alert} from 'react-native';
import DisableButton from './DisabledButton';

export default function ClaimButton(props){
    return(
    <>
    {
        props.lastClaim <= 0?
            (
                <Button
                    onPress={() => Alert.alert(
                        'Claiming Daily Reward',
                        'You can claim the daily reward every 24 hours',
                        [
                        {text: 'Claim now', onPress: () => props.claim()},
                        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
                        ],
                        { cancelable: false }
                    )}
                    title="Claim now"
                    color="#47ad53"
                    accessibilityLabel="Watch ad to earn Nano"
                />
            ):
            (
                <DisableButton count={props.lastClaim} />
            )
    }
    </>  
)};