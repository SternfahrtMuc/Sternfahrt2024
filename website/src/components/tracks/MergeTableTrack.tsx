import { Button, Form } from 'react-bootstrap';
import { TrackComposition } from '../../store/types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getSegmentIdClipboard, trackMergeActions } from '../../store/trackMerge.reducer.ts';
import { useState } from 'react';
import { ConfirmationModal } from '../ConfirmationModal.tsx';
import { FileDownloader } from '../segments/FileDownloader.tsx';
import { getCalculatedTracks } from '../../store/calculatedTracks.reducer.ts';
import { TrackSelectionCell } from './TrackSelectionCell.tsx';
import copyToClipboard from '../../assets/copy-to-clipboard.svg';
import inputFromClipboard from '../../assets/input-from-clipboard.svg';

interface Props {
    track: TrackComposition;
}

export function MergeTableTrack({ track }: Props) {
    const { name, id } = track;
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const calculatedTrack = useSelector(getCalculatedTracks).find((track) => track.id === id);
    const segmentIdClipboard = useSelector(getSegmentIdClipboard);

    return (
        <tr>
            <td>
                <Form.Control
                    type="text"
                    placeholder="Track name"
                    value={name}
                    onChange={(value) =>
                        dispatch(trackMergeActions.setTrackName({ id, trackName: value.target.value }))
                    }
                />
            </td>
            <TrackSelectionCell track={track} />
            <td>
                <>
                    <Button
                        variant="danger"
                        onClick={() => setShowModal(true)}
                        title={`Remove track ${track.name ?? ''}`}
                    >
                        x
                    </Button>
                    <Button
                        variant="info"
                        onClick={() => dispatch(trackMergeActions.setSegmentIdClipboard(track.segmentIds))}
                        title={'Copy segmentIds to clipboard'}
                    >
                        <img src={copyToClipboard} alt="copy to clipboard" color={'#ffffff'} />
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            dispatch(trackMergeActions.setSegments({ id: track.id, segments: segmentIdClipboard! }));
                            dispatch(trackMergeActions.setSegmentIdClipboard(undefined));
                        }}
                        title={'Copy segmentIds to clipboard'}
                        disabled={!segmentIdClipboard}
                    >
                        <img src={inputFromClipboard} alt="input from clipboard" color={'#ffffff'} />
                    </Button>
                    {showModal && (
                        <ConfirmationModal
                            onConfirm={() => dispatch(trackMergeActions.removeTrackComposition(id))}
                            closeModal={() => setShowModal(false)}
                            title={`Removing track ${track.name ?? ''}`}
                            body={`Do you really want to remove the track ${track.name ?? ''}?`}
                        />
                    )}
                    {calculatedTrack && (
                        <FileDownloader
                            id={calculatedTrack.id}
                            content={calculatedTrack.content}
                            name={calculatedTrack.filename + '.gpx'}
                            onlyIcon={true}
                        />
                    )}
                </>
            </td>
        </tr>
    );
}
