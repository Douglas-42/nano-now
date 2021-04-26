import React, { useEffect, useState } from 'react';
import {Button} from 'react-native';
import {formatDate} from '../util/helper';

export default function DisableButton(props){
    const [count,setCount] = useState(props.count)
    useEffect(()=>{
        
         // exit early when we reach 0
         if (count < 0) return;
    
         // save intervalId to clear the interval when the
         // component re-renders
         const intervalId = setInterval(() => {
           setCount(count - 1000);
         }, 1000);
     
         // clear interval on re-render to avoid memory leaks
         return () => clearInterval(intervalId);
         // add timeLeft as a dependency to re-rerun the effect
         // when we update it
    }, [count]);
    return(
        <Button
        onPress={() => console.log("You must wait")}
        title={`${formatDate(count)}`}
        color="#a1a1a1"
        accessibilityLabel="This action is not availible now."
        />        
)};