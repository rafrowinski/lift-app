import React from 'react';
import {useEffect, useState} from "react";
import {SSEHelper} from "./helpers/SSEHelper";

export const SSEList = () => {

    const [eventList, setEventList] = useState([] as any[]);

    useEffect(() => {
        const observable = SSEHelper.getLiftStatusObservable();
        const subscription = observable.subscribe(
            message => setEventList([...eventList, message]),
            console.error,
        )

        return () => subscription.unsubscribe();
    });

    return (<div>{eventList}</div>);
}

