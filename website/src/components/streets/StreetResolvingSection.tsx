import { Col, Row } from 'react-bootstrap';
import { TrackDataOverview } from './TrackDataOverview.tsx';
import { ApiKeyInput } from './ApiKeyInput.tsx';
import { StreetResolvedTracks } from './StreetResolvedTracks.tsx';

export const StreetResolvingSection = () => {
    return (
        <Row className="flex-xl-nowrap" style={{ height: '60vh', width: '100%' }}>
            <Col xl={4}>
                <div className={'m-2 p-2 shadow'} style={{ height: '95%', overflow: 'auto' }}>
                    <TrackDataOverview />
                    <hr />
                    <ApiKeyInput />
                </div>
            </Col>
            <Col xl={8}>
                <div className={'m-2 p-2 shadow'} style={{ height: '95%' }}>
                    <StreetResolvedTracks />
                </div>
            </Col>
        </Row>
    );
};
