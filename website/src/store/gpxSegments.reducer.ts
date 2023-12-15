import { createSelector, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { GpxSegment, GpxSegmentsState, State } from './types';
import { storage } from './storage.ts';
import { filterItems } from '../utils/filterUtil.ts';

const initialState: GpxSegmentsState = {
    segments: [],
};

const gpxSegmentsSlice = createSlice({
    name: 'gpxSegments',
    initialState: storage.load()?.gpxSegments ?? initialState,
    reducers: {
        addGpxSegments: (state: GpxSegmentsState, action: PayloadAction<GpxSegment[]>) => {
            state.segments = [...state.segments, ...action.payload];
        },
        orderGpxSegments: (state: GpxSegmentsState, action: PayloadAction<string[]>) => {
            console.log(action.payload, state.segments);
        },
        removeGpxSegment: (state: GpxSegmentsState, action: PayloadAction<string>) => {
            state.segments = state.segments.filter((segment) => segment.id !== action.payload);
        },
        changeGpxSegmentContent: (
            state: GpxSegmentsState,
            action: PayloadAction<{ id: string; newContent: string }>
        ) => {
            state.segments = state.segments.map((segment) =>
                segment.id === action.payload.id ? { ...segment, content: action.payload.newContent } : segment
            );
        },
        clearGpxSegments: (state: GpxSegmentsState) => {
            state.segments = [];
        },
        setPeopleCountStart: (state: GpxSegmentsState, action: PayloadAction<{ id: string; count: number }>) => {
            state.segments = state.segments.map((segment) =>
                segment.id === action.payload.id ? { ...segment, peopleCountStart: action.payload.count } : segment
            );
        },
        setPeopleCountEnd: (state: GpxSegmentsState, action: PayloadAction<{ id: string; count: number }>) => {
            state.segments = state.segments.map((segment) =>
                segment.id === action.payload.id ? { ...segment, peopleCountEnd: action.payload.count } : segment
            );
        },
        setFilename: (state: GpxSegmentsState, action: PayloadAction<{ id: string; filename: string }>) => {
            state.segments = state.segments.map((segment) =>
                segment.id === action.payload.id ? { ...segment, filename: action.payload.filename } : segment
            );
        },
        setFilterTerm: (state: GpxSegmentsState, action: PayloadAction<string>) => {
            state.segmentFilterTerm = action.payload;
        },
        setSegmentVelocity: (state: GpxSegmentsState, action: PayloadAction<{ id: string; velocity?: number }>) => {
            const { id, velocity } = action.payload;
            if (!state.segmentVelocity) {
                state.segmentVelocity = { [id]: velocity };
            } else {
                state.segmentVelocity[id] = velocity;
            }
        },
    },
});

export const gpxSegmentsActions = gpxSegmentsSlice.actions;
export const gpxSegmentsReducer: Reducer<GpxSegmentsState> = gpxSegmentsSlice.reducer;
const getBase = (state: State) => state.gpxSegments;
export const getGpxSegments = (state: State) => getBase(state).segments;
export const getSegmentFilterTerm = (state: State) => getBase(state).segmentFilterTerm;
export const getSegmentVelocities = (state: State) => getBase(state).segmentVelocity ?? {};

export const getFilteredGpxSegments = createSelector(getGpxSegments, getSegmentFilterTerm, (segments, filterTerm) => {
    return filterItems(filterTerm, segments, (track: GpxSegment) => track.filename);
});
