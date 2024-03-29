import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { GeoCodingRequestsState, State } from './types.ts';

const initialState: GeoCodingRequestsState = {
    requestCounter: 0,
    postCodeRequestCounter: 0,
    requestDoneCounter: 0,
    postCodeRequestDoneCounter: 0,
    isLoadingData: false,
    isAggregating: false,
};

const geoCodingRequestsSlice = createSlice({
    name: 'geoCoding',
    initialState: initialState,
    reducers: {
        increaseActiveRequestCounter: (state: GeoCodingRequestsState) => {
            state.requestCounter += 1;
        },
        decreaseActiveRequestCounter: (state: GeoCodingRequestsState) => {
            state.requestCounter -= 1;
        },
        increaseRequestDoneCounter: (state: GeoCodingRequestsState) => {
            state.requestDoneCounter += 1;
        },
        resetRequestDoneCounter: (state: GeoCodingRequestsState) => {
            state.requestDoneCounter = 0;
        },
        setNumberOfRequiredRequests: (state: GeoCodingRequestsState, action: PayloadAction<number>) => {
            state.numberOfRequiredRequests = action.payload;
        },
        increaseActivePostCodeRequestCounter: (state: GeoCodingRequestsState) => {
            state.postCodeRequestCounter += 1;
        },
        decreaseActivePostCodeRequestCounter: (state: GeoCodingRequestsState) => {
            state.postCodeRequestCounter -= 1;
        },
        increasePostCodeRequestDoneCounter: (state: GeoCodingRequestsState) => {
            state.postCodeRequestDoneCounter += 1;
        },
        resetPostCodeRequestDoneCounter: (state: GeoCodingRequestsState) => {
            state.postCodeRequestDoneCounter = 0;
        },
        setIsLoadingData: (state: GeoCodingRequestsState, action: PayloadAction<boolean>) => {
            state.isLoadingData = action.payload;
        },
        setIsAggregating: (state: GeoCodingRequestsState, action: PayloadAction<boolean>) => {
            state.isAggregating = action.payload;
        },
        clear: () => initialState,
    },
});

export const geoCodingRequestsActions = geoCodingRequestsSlice.actions;
export const geoCodingRequestsReducer: Reducer<GeoCodingRequestsState> = geoCodingRequestsSlice.reducer;
const getBase = (state: State) => state.geoCodingRequests;
export const getIsLoadingGeoData = (state: State) => getBase(state).isLoadingData;
export const getIsAggregating = (state: State) => getBase(state).isAggregating;
