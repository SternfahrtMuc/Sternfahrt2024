import { TrackStreetInfo } from '../../mapMatching/types.ts';
import { formatTimeOnly, getTimeDifferenceInSeconds } from '../../utils/dateUtil.ts';
import { Table } from 'react-bootstrap';
import { StreetMapLink } from './StreetMapLink.tsx';
import { HighlightUnknown } from './HighlightUnknown.tsx';
import geoDistance from 'geo-distance-helper';
import { toLatLng } from '../../logic/speedSimulator.ts';

interface Props {
    trackStreetInfo: TrackStreetInfo;
}

export const SingleTrackStreetInfo = ({ trackStreetInfo }: Props) => {
    const { name, wayPoints, distanceInKm, start, end, arrival, startThrough } = trackStreetInfo;
    const average = (distanceInKm / getTimeDifferenceInSeconds(arrival, start)) * 60 * 60;
    return (
        <div>
            <h5>{name}</h5>
            <div className={'d-flex justify-content-between'}>
                <div className={'m-3'}>{`Distance: ${distanceInKm.toFixed(2)} km`}</div>
                <div className={'m-3'}>{`Start: ${formatTimeOnly(start)}`}</div>
                <div className={'m-3'}>{`Arrival: ${formatTimeOnly(startThrough)}`}</div>
                <div className={'m-3'}>{`End: ${formatTimeOnly(end)}`}</div>
                <div className={'m-3'}>{`Average speed: ${average.toFixed(1)} km/h`}</div>
            </div>
            <Table striped bordered hover style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Street</th>
                        <th>Post code</th>
                        <th>Length</th>
                        <th>Duration</th>
                        <th>From</th>
                        <th>FromTrough</th>
                        <th>To</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                    {wayPoints.map(({ streetName, to, from, fromThrough, postCode, pointTo, pointFrom }) => (
                        <tr key={to}>
                            <td>
                                <HighlightUnknown value={streetName} />
                            </td>
                            <td>
                                <HighlightUnknown value={postCode?.toString() ?? 'Unknown'} />
                            </td>
                            <td>{(geoDistance(toLatLng(pointFrom), toLatLng(pointTo)) as number).toFixed(2)} km</td>
                            <td>{(getTimeDifferenceInSeconds(to, from) / 60).toFixed(1)} min</td>
                            <td>{formatTimeOnly(from)}</td>
                            <td>{formatTimeOnly(fromThrough)}</td>
                            <td>{formatTimeOnly(to)}</td>
                            <td>
                                <StreetMapLink pointTo={pointTo} pointFrom={pointFrom} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
