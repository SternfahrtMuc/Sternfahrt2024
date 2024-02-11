import { useDispatch, useSelector } from 'react-redux';
import { SingleTrackStreetInfo } from './SingleTrackStreetInfo.tsx';
import { Button, Pagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { StreetFilesDownloader } from './StreetFilesDownloader.tsx';
import { getEnrichedTrackStreetInfos } from '../logic/resolving/selectors/getEnrichedTrackStreetInfos.ts';
import { BlockedStreetInfo } from './BlockedStreetInfo.tsx';
import { geoCodingActions, getOnlyShowUnknown } from '../store/geoCoding.reducer.ts';
import { StreetFilesPdfMakeDownloader } from './StreetFilesPdfMakeDownloader.tsx';
import { FormattedMessage, useIntl } from 'react-intl';

export function StreetResolvedTracks() {
    const intl = useIntl();
    const trackStreetInfos = useSelector(getEnrichedTrackStreetInfos);
    const [selectedTrackId, setSelectedTrackId] = useState<string>();
    const onlyShowUnknown = useSelector(getOnlyShowUnknown);
    const dispatch = useDispatch();

    const selectedInfo = trackStreetInfos.find(({ id }) => id === selectedTrackId);

    useEffect(() => {
        if (trackStreetInfos.length > 0) {
            setSelectedTrackId(trackStreetInfos[0].id);
        }
    }, [trackStreetInfos.length]);

    return (
        <>
            <div className={'m-2 p-2'} style={{ height: '100px', overflow: 'hidden' }}>
                <h3>
                    <FormattedMessage id={'msg.trackStreetInfo'} />
                </h3>
                <div className={'d-flex justify-content-between'}>
                    <div className={'mx-2'}>
                        <StreetFilesDownloader />
                    </div>
                    <div className={'mx-2'}>
                        <StreetFilesPdfMakeDownloader />
                    </div>
                    <div className={'mx-2'}>
                        <Button
                            variant={'secondary'}
                            onClick={() => dispatch(geoCodingActions.toggleOnlyShowUnknown())}
                        >
                            {intl.formatMessage({ id: onlyShowUnknown ? 'msg.allEntries' : 'msg.onlyUnknown' })}
                        </Button>
                    </div>
                    <Pagination></Pagination>
                    <Pagination>
                        <Pagination.Item
                            key={'streets'}
                            active={'streets' === selectedTrackId}
                            onClick={() => setSelectedTrackId('streets')}
                        >
                            Streets
                        </Pagination.Item>
                        {trackStreetInfos.map(({ id, name }) => (
                            <Pagination.Item
                                key={id}
                                active={id === selectedTrackId}
                                onClick={() => setSelectedTrackId(id)}
                                title={name}
                            >
                                {trackStreetInfos.length > 6 ? name.split(' ')[0] : name}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
            <div style={{ height: '80%', overflow: 'auto' }}>
                <div>
                    <div>
                        {selectedInfo && <SingleTrackStreetInfo trackStreetInfo={selectedInfo} />}
                        {selectedTrackId === 'streets' && <BlockedStreetInfo />}
                        {!selectedInfo && selectedTrackId !== 'streets' && (
                            <div>
                                <FormattedMessage id={'msg.noTrackSelected'} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
