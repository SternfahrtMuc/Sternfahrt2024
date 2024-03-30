import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getShowTrackInfo, mapActions } from '../store/map.reducer.ts';

export function TrackInformationModal() {
    const dispatch = useDispatch();
    const showModal = useSelector(getShowTrackInfo);

    const setShowModal = (value: boolean) => dispatch(mapActions.setShowTrackInfo(value));

    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                <FormattedMessage id={'msg:trackInfo'} />
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false} size={'xl'}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id={'msg:trackInfo'} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Hell</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <FormattedMessage id={'msg.close'} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
