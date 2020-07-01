import React from 'react';
import { useEffect, useState } from "react";
import { LiftStatusMessage, SSEHelper } from "./helpers/SSEHelper";

export const SSEList = () => {

    const [eventList, setEventList] = useState<Array<LiftStatusMessage>>([]);

    useEffect(() => {
        const observable = SSEHelper.instance.getLiftStatusObservable();
        const subscription = observable.subscribe(
            message => setEventList([...eventList, message]),
            console.error, // TODO add error handling
        )

        return () => subscription.unsubscribe();
    });

    return (<div>{eventList}</div>);
}

