import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { GeoCodingState, ResolvePositions, State } from './types';
import { storage } from './storage.ts';

const initialState: GeoCodingState = {
    requestCounter: 0,
    requestDoneCounter: 0,
};

const geoCodingSlice = createSlice({
    name: 'geoCoding',
    initialState: storage.load()?.geoCoding ?? initialState,
    reducers: {
        setGeoApifyKey: (state: GeoCodingState, action: PayloadAction<string>) => {
            state.geoApifyKey = action.payload;
        },
        setBigDataCloudKeyKey: (state: GeoCodingState, action: PayloadAction<string>) => {
            state.bigDataCloudKey = action.payload;
        },
        saveResolvedPositions: (state: GeoCodingState, action: PayloadAction<ResolvePositions>) => {
            if (!state.resolvedPositions) {
                state.resolvedPositions = {};
            }
            const resolvedPositions = state.resolvedPositions;
            Object.entries(action.payload).forEach(([key, value]) => {
                if (resolvedPositions[key] === null) {
                    resolvedPositions[key] = value;
                }
                if (resolvedPositions[key] === undefined) {
                    resolvedPositions[key] = value;
                }
            });
            state.resolvedPositions = resolvedPositions;
        },
        increaseActiveRequestCounter: (state: GeoCodingState) => {
            state.requestCounter += 1;
        },
        decreaseActiveRequestCounter: (state: GeoCodingState) => {
            state.requestCounter -= 1;
        },
        increaseRequestDoneCounter: (state: GeoCodingState) => {
            state.requestDoneCounter += 1;
        },
        resetRequestDoneCounter: (state: GeoCodingState) => {
            state.requestDoneCounter = 0;
        },
        setNumberOfRequiredRequests: (state: GeoCodingState, action: PayloadAction<number>) => {
            state.numberOfRequiredRequests = action.payload;
        },
    },
});

export const geoCodingActions = geoCodingSlice.actions;
export const geoCodingReducer: Reducer<GeoCodingState> = geoCodingSlice.reducer;
const getBase = (state: State) => state.geoCoding;
export const getGeoApifyKey = (state: State) => getBase(state).geoApifyKey;
export const getBigDataCloudKey = (state: State) => getBase(state).bigDataCloudKey;
export const getResolvedPositions = (state: State) => getBase(state).resolvedPositions ?? {};
export const getNumberOfRequiredRequests = (state: State) => getBase(state).numberOfRequiredRequests;
export const getNumberOfRequestsDone = (state: State) => getBase(state).requestDoneCounter;
export const getNumberOfRequestsRunning = (state: State) => getBase(state).requestCounter;