import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenMapTime, getCurrentRealTime, mapActions } from './store/map.reducer.ts';
import { MAX_SLIDER_TIME } from '../common/constants.ts';
import { getZipCurrentTimeStamp } from './map/dataReading.ts';
import { useIntl } from 'react-intl';
import { DateTimeFormat } from '../utils/dateUtil.ts';
import play from '../assets/play.svg';
import stop from '../assets/stop.svg';
import { useEffect, useState } from 'react';
import { bikeCounterMirror } from './criticalmaps/criticalMapsHook.ts';

let interval: NodeJS.Timeout | undefined;

let timeMirror = 0;

export const isLive = window.location.search.includes('&live');

export function ZipTimeSlider({
    bigThumb,
    showPlayButton,
    showTimes,
}: {
    bigThumb?: boolean;
    showPlayButton?: boolean;
    showTimes: boolean;
}) {
    const mapTime = useSelector(getCurrenMapTime);
    const currentRealTime = useSelector(getCurrentRealTime);
    const sliderTime = useSelector(getZipCurrentTimeStamp);
    const dateValue = currentRealTime ?? sliderTime;
    const dispatch = useDispatch();
    const intl = useIntl();
    const [playing, setPlaying] = useState(false);

    timeMirror = mapTime;

    useEffect(() => {
        if (interval) {
            clearInterval(interval);
        }
        if (playing) {
            interval = setInterval(
                () => dispatch(mapActions.setCurrentTime((timeMirror + 500) % MAX_SLIDER_TIME)),
                100
            );
        }
    }, [playing]);

    useEffect(() => {
        if (isLive) {
            dispatch(mapActions.setCurrentRealTime());
            setInterval(() => {
                dispatch(mapActions.setCurrentRealTime());
            }, 20 * 1000);
        }
    }, []);

    if (isLive) {
        return (
            <div>
                <h6>{`Eingeschaltete Apps: ${bikeCounterMirror}`}</h6>
                <div>
                    {dateValue ? intl.formatDate(dateValue, DateTimeFormat) : intl.formatMessage({ id: 'msg.time' })}
                </div>
            </div>
        );
    }

    return (
        <div className={'d-flex'}>
            <div className={'flex-fill'}>
                <Form.Group className={'mx-3'}>
                    {showTimes && (
                        <div>
                            {dateValue
                                ? intl.formatDate(dateValue, DateTimeFormat)
                                : intl.formatMessage({ id: 'msg.time' })}
                        </div>
                    )}
                    <div className={`d-flex${bigThumb ? ' my-2' : ''}`}>
                        <Form.Range
                            min={0}
                            max={MAX_SLIDER_TIME}
                            value={mapTime}
                            onChange={(event) => dispatch(mapActions.setCurrentTime(Number(event.target.value)))}
                            height={'100px'}
                            className={bigThumb ? 'bigThumb' : undefined}
                        />
                    </div>
                </Form.Group>
            </div>
            {showPlayButton && (
                <div className={'mt-3'}>
                    <Button
                        size={'sm'}
                        variant={playing ? 'danger' : 'success'}
                        className={'m-1'}
                        onClick={() => setPlaying(!playing)}
                        title={intl.formatMessage({ id: playing ? 'msg.play.stop' : 'msg.play.normal' })}
                    >
                        {playing ? (
                            <img src={stop} className="m-1" alt="open file" />
                        ) : (
                            <img src={play} className="m-1" alt="open file" />
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
