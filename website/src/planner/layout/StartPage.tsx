import { Card, Col, Container, Row } from 'react-bootstrap';
import { Sections } from './types.ts';
import stars from '../../assets/stars.svg';
import fileUp from '../../assets/file-up.svg';
import info from '../../assets/info.svg';
import { WizardHeader } from '../wizard/WizardHeader.tsx';
import { useDispatch } from 'react-redux';
import { layoutActions } from '../store/layout.reducer.ts';

const cardStyle = {
    style: { minWidth: '18rem', minHeight: '25rem', cursor: 'pointer' },
    className: 'startPageCard shadow m-2',
};

export const StartPage = () => {
    const dispatch = useDispatch();
    const setSelectedSection = (section: Sections) => dispatch(layoutActions.selectSection(section));

    return (
        <Container>
            <WizardHeader />
            <h5 className={'mb-5'}>Choose your situation:</h5>
            <Row>
                <Col>
                    <Card {...cardStyle} onClick={() => setSelectedSection('wizard-parameters')}>
                        <Card.Body>
                            <Card.Title>Start a new planning</Card.Title>
                            <Card.Text style={{ minHeight: '3rem' }}>
                                Plan a moving demonstration with multiple branches
                            </Card.Text>
                            <img
                                src={stars}
                                className="m-1"
                                alt="start new planning"
                                style={{ height: '10rem', width: '10rem' }}
                                color={'#ffffff'}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card {...cardStyle} onClick={() => setSelectedSection('importExport')}>
                        <Card.Body>
                            <Card.Title>Load an existing planning</Card.Title>
                            <Card.Text style={{ minHeight: '3rem' }}>Load an existing planning via json file</Card.Text>
                            <img
                                src={fileUp}
                                className="m-1"
                                alt="open existing planning"
                                style={{ height: '10rem', width: '10rem' }}
                                color={'#ffffff'}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card {...cardStyle} onClick={() => setSelectedSection('gps')}>
                        <Card.Body>
                            <Card.Title>Learn how to do a planning</Card.Title>
                            <Card.Text style={{ minHeight: '3rem' }}>
                                Go through a sample planning of a demonstration with help
                            </Card.Text>
                            <img
                                src={info}
                                className="m-1"
                                alt="open existing planning"
                                style={{ height: '10rem', width: '10rem' }}
                                color={'#ffffff'}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};