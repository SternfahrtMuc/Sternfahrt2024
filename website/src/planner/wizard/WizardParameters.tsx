import { ArrivalDateTimePicker } from '../parameters/ArrivalDateTimePicker.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getArrivalDateTime } from '../store/trackMerge.reducer.ts';
import { ParticipantsDelaySetter } from '../parameters/ParticipantsDelaySetter.tsx';
import { AverageSpeedSetter } from '../parameters/AverageSpeedSetter.tsx';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { WizardHeader } from './WizardHeader.tsx';
import { layoutActions } from '../store/layout.reducer.ts';
import { Sections } from '../layout/types.ts';

export const WizardParameters = () => {
    const arrivalDateTime = useSelector(getArrivalDateTime);
    const dispatch = useDispatch();
    const setSelectedSection = (section: Sections) => dispatch(layoutActions.selectSection(section));

    return (
        <Container>
            <WizardHeader />
            <Row>
                <Col>
                    <ArrivalDateTimePicker />
                    {arrivalDateTime && (
                        <>
                            <hr />
                            <h5 className={'mt-5'}>Optional parameters</h5>
                            <ParticipantsDelaySetter />
                            <hr />
                            <AverageSpeedSetter />
                            <hr />
                            <p>These parameters can still be changed afterwards</p>
                            <Button onClick={() => setSelectedSection('wizard-segments')}>Continue</Button>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};