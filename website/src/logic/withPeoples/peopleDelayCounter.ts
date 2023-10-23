import { TrackComposition } from '../../store/types.ts';
import { TrackNode } from './nodeFinder.ts';
import { shiftEndDate } from '../shiftEndDate.ts';

export const DELAY_PER_PERSON_IN_SECONDS = 0.2;

export function sumUpAllPeopleWithHigherPriority(
    segments: { segmentId: string; trackId: string; amount?: number }[],
    trackId: string
): number {
    const segmentsCopy = [...segments];
    segmentsCopy.sort((a, b) => ((a.amount ?? 0) > (b.amount ?? 0) ? -1 : 1));
    const indexOfTrack = segmentsCopy.findIndex((segment) => segment.trackId === trackId);

    let numberOfPeopleWithHigherPriority = 0;

    segmentsCopy.forEach((segment, index) => {
        if (index < indexOfTrack) {
            numberOfPeopleWithHigherPriority += segment.amount ?? 0;
        }
    });

    return numberOfPeopleWithHigherPriority;
}

export function getAdjustedArrivalDateTime(arrivalDateTime: Date, track: TrackComposition, trackNodes: TrackNode[]) {
    let delayForTrackInMinutes = 0;
    trackNodes.forEach((trackNode) => {
        const nodeInfluencesTrack = trackNode.segmentsBeforeNode.map((segments) => segments.trackId).includes(track.id);
        if (nodeInfluencesTrack) {
            const peopleWithHigherPriority = sumUpAllPeopleWithHigherPriority(trackNode.segmentsBeforeNode, track.id);
            delayForTrackInMinutes += (peopleWithHigherPriority * DELAY_PER_PERSON_IN_SECONDS) / 60;
        }
    });
    // console.log(delayForTrackInMinutes);
    return shiftEndDate(arrivalDateTime, delayForTrackInMinutes);
}