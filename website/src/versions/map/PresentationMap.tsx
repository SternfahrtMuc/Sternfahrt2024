import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet.locatecontrol'; // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'; // Import styles
import L, { LayerGroup } from 'leaflet';
import { zipTracksDisplayHook } from './zipTracksDisplayHook.ts';
import { zipTrackMarkerDisplayHook } from './zipTrackMarkerDisplayHook.ts';
import { getMapConfiguration } from '../../common/mapConfig.ts';
import { Munich } from '../../common/locations.ts';
import { useDispatch } from 'react-redux';
import { mapActions } from '../store/map.reducer.ts';
import { criticalMapsHook } from '../criticalmaps/criticalMapsHook.ts';
import { isLive } from '../ZipTimeSlider.tsx';

let myMap: L.Map;

export const isInIframe = window.location.search.includes('&iframe');

export const PresentationMap = () => {
    const { tileUrlTemplate, startZoom, getOptions } = getMapConfiguration();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!myMap) {
            const noSingleScroll = { tap: !L.Browser.mobile, dragging: !L.Browser.mobile };
            myMap = L.map('mapid', isInIframe ? noSingleScroll : undefined).setView(Munich, startZoom);
            L.tileLayer(tileUrlTemplate, getOptions()).addTo(myMap);
            if (isLive) {
                // @ts-ignore
                L.control.locate().addTo(myMap);
            }
        }
    }, []);

    const zipTracksLayer = useRef<LayerGroup>(null);
    const tracksLayer = useRef<LayerGroup>(null);
    const criticalMapsLayer = useRef<LayerGroup>(null);

    useEffect(() => {
        // @ts-ignore
        zipTracksLayer.current = L.layerGroup().addTo(myMap);
        // @ts-ignore
        tracksLayer.current = L.layerGroup().addTo(myMap);
        // @ts-ignore
        criticalMapsLayer.current = L.layerGroup().addTo(myMap);
    }, []);

    zipTracksDisplayHook(zipTracksLayer, true);
    zipTrackMarkerDisplayHook(tracksLayer);
    criticalMapsHook(criticalMapsLayer);

    return (
        <div onMouseLeave={() => dispatch(mapActions.setHighlightedTrack())}>
            <div id="mapid" style={{ height: '100vh', zIndex: 0 }} />
        </div>
    );
};
