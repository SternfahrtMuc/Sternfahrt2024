import { useSelector } from 'react-redux';
import { getSingleZipTracks } from '../store/zipTracks.reducer.ts';
import { Button, Card, Col, Row } from 'react-bootstrap';

const cardStyle = {
    style: { width: '200px', height: '130px', cursor: 'pointer' },
    className: 'startPageCard shadow mb-2 p-2 text-center',
};

export function TrackInformationModalBody() {
    const tracks = useSelector(getSingleZipTracks);
    const sortedTracks = [...(tracks ?? [])].sort((a, b) =>
        a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' })
    );
    return (
        <div>
            <Row>
                {sortedTracks?.map((track) => (
                    <Col>
                        <Card {...cardStyle} key={track.id}>
                            <Card.Body className={'m-0 p-0'}>
                                <h6>{track.filename}</h6>
                                <p>Start: 10:00</p>
                                <div>
                                    <div>
                                        <Button>GPX</Button>
                                        <Button className={'mx-2'}>PDF</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
