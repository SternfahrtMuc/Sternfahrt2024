import { useSelector } from 'react-redux';
import { MutableRefObject, useEffect } from 'react';
import { LayerGroup } from 'leaflet';
import { addTracksToLayer } from '../../common/map/addTrackToMap.ts';
import { getShowMapMarker } from '../store/map.reducer.ts';
import { getSelectedTracks, getSelectedVersions, getZipTracks } from '../store/zipTracks.reducer.ts';

export function zipTracksDisplayHook(calculatedTracksLayer: MutableRefObject<LayerGroup | null>) {
    const zipTracks = useSelector(getZipTracks);
    const showMarker = useSelector(getShowMapMarker);
    const selectedVersions = useSelector(getSelectedVersions);
    const selectedTracks = useSelector(getSelectedTracks);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const tracks = selectedVersions.flatMap((version) => {
            const tracksOfVersion = zipTracks[version] ?? [];
            if ((selectedTracks[version]?.length ?? 0) === 0) {
                return tracksOfVersion;
            }
            return tracksOfVersion.filter((track) => selectedTracks[version]?.includes(track.id));
        });
        addTracksToLayer(calculatedTracksLayer, tracks, true, {
            showMarker,
            onlyShowBreaks: true,
            opacity: 0.7,
        });
    }, [zipTracks, zipTracks.length, selectedTracks, selectedVersions, showMarker]);
}