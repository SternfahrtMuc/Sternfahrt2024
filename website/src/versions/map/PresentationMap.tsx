import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import L, { LayerGroup } from 'leaflet';
import { zipTracksDisplayHook } from './zipTracksDisplayHook.ts';
import { zipTrackMarkerDisplayHook } from './zipTrackMarkerDisplayHook.ts';
import { getMapConfiguration } from '../../common/mapConfig.ts';
import { Munich } from '../../common/locations.ts';
import { useDispatch } from 'react-redux';
import { mapActions } from '../store/map.reducer.ts';

let myMap: L.Map;

export const PresentationMap = () => {
    const { tileUrlTemplate, startZoom, getOptions } = getMapConfiguration();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!myMap) {
            myMap = L.map('mapid').setView(Munich, startZoom);
            L.tileLayer(tileUrlTemplate, getOptions()).addTo(myMap);
        }
    }, []);

    const zipTracksLayer = useRef<LayerGroup>(null);
    const tracksLayer = useRef<LayerGroup>(null);

    useEffect(() => {
        // @ts-ignore
        zipTracksLayer.current = L.layerGroup().addTo(myMap);
        // @ts-ignore
        tracksLayer.current = L.layerGroup().addTo(myMap);
    }, []);

    zipTracksDisplayHook(zipTracksLayer, true);
    zipTrackMarkerDisplayHook(tracksLayer);

    return (
        <div onMouseLeave={() => dispatch(mapActions.setHighlightedTrack())}>
            <div id="mapid" style={{ height: '100vh', zIndex: 0 }} />
        </div>
    );
};
