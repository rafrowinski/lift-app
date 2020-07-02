import React from 'react';
import { connect } from 'react-redux';
import { IStore, LiftStatusMap } from './redux/store';

interface IStoreProps {
    liftStatusMap: LiftStatusMap;
}

type IProps = IStoreProps;

export const Component: React.FC<IProps> = ({ liftStatusMap }) => {
    return (<div>{JSON.stringify(liftStatusMap)}</div>);
}

type IMapStateToProps = (store: IStore) => {
    liftStatusMap: LiftStatusMap,
}

const mapStateToProps: IMapStateToProps = ({ liftStatusMap }) => ({
    liftStatusMap,
});

export const SSEList = connect(mapStateToProps)(Component);
