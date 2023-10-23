import { SimpleGPX } from './SimpleGPX.ts';

/**
 * @deprecated use new SimpleGPX((SimpleGPX)[]) instead
 */
export function mergeGpxs(first: SimpleGPX, second: SimpleGPX): SimpleGPX {
    return new SimpleGPX([first, second]);
}

/**
 * Assumptions:
 * - a gpx file contains n track segments "trkseg"
 * - order of segments is order of recording
 * - a segment contains n (usually many) trackpoints "trkpt"
 * - order of trackpoints is order of recording
 * - stuff in second before 1st segment and after last segment is ignored
 *
 * Consequence of assumptions easy handling of files:
 * - for segments: joining is happening either before 1st or after last segment
 * - for trackpoints: calculating "new" times is just a matter of adding or subtracting
 *
 * @param first the track to join the second to
 * @param second this gets joined at the end of the first
 *
 */
export function mergeGpxsStrings(first: string, second: string): string {
    console.log(first, second);
    // find last occurrence of </trkseg> in first
    // and join first (and consecutive) trksegs from second
    let lastSegEndInFirst = first.lastIndexOf('</trkseg>') + 9;
    let firstSegStartInSecond = second.indexOf('<trkseg>');
    let lastSegEndInSecond = second.lastIndexOf('</trkseg>') + 9;
    return (
        first.slice(0, lastSegEndInFirst) +
        second.slice(firstSegStartInSecond, lastSegEndInSecond) +
        first.slice(lastSegEndInFirst)
    );
}
