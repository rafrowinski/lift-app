import React from 'react';
import {useEffect, useState} from "react";

export const SSEList = () => {

    const [eventList, setEventList] = useState([] as any[]);

    useEffect(() => {
        const evtSource = new EventSource("http://localhost:8080/stream");
        evtSource.onmessage = event => {
            setEventList([...eventList, event.data]);
        }

        return () => {
            evtSource.onmessage = () => { // todo change to add and remove listener
            }
        };
    });

    return (<div>{eventList}</div>);
}

