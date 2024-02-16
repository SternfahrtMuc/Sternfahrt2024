import { ButtonGroup, ButtonToolbar, Pagination, Row } from 'react-bootstrap';
import { Sections } from './types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectionSection, layoutActions } from '../store/layout.reducer.ts';
import { LanguageSelection } from './LanguageSelection.tsx';
import { FormattedMessage } from 'react-intl';
import { HelpButton } from '../tutorial/HelpButton.tsx';
import { RemoveDataButton } from './RemoveDataButton.tsx';
import { useState } from 'react';
import { BackToStartDialog } from './BackToStartDialog.tsx';

export const AppHeader = () => {
    const dispatch = useDispatch();
    const selectedSection = useSelector(getSelectionSection);
    const setSelectedSection = (section: Sections) => dispatch(layoutActions.selectSection(section));

    const [showModal, setShowModal] = useState(false);

    return (
        <Row>
            <div className="footer-copyright text-center py-3">
                <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
                    <Pagination>
                        <Pagination.Item key={'start'} onClick={() => setShowModal(true)}>
                            <FormattedMessage id={'msg.start'} />
                        </Pagination.Item>
                        <Pagination.Item
                            key={'gps'}
                            active={'gps' === selectedSection}
                            onClick={() => setSelectedSection('gps')}
                        >
                            <FormattedMessage id={'msg.planner'} />
                        </Pagination.Item>
                        <Pagination.Item
                            key={'settings'}
                            active={'settings' === selectedSection}
                            onClick={() => setSelectedSection('settings')}
                        >
                            <FormattedMessage id={'msg.settings'} />
                        </Pagination.Item>
                        <Pagination.Item
                            key={'streets'}
                            active={'streets' === selectedSection}
                            onClick={() => setSelectedSection('streets')}
                        >
                            <FormattedMessage id={'msg.streets'} />
                        </Pagination.Item>
                        <Pagination.Item
                            key={'importExport'}
                            active={'importExport' === selectedSection}
                            onClick={() => setSelectedSection('importExport')}
                        >
                            <FormattedMessage id={'msg.importExport'} />
                        </Pagination.Item>
                    </Pagination>
                    <h1>
                        <FormattedMessage id={'msg.appName'} />
                    </h1>
                    <ButtonToolbar aria-label="Toolbar with Button groups" className={'m-0'}>
                        <ButtonGroup aria-label="help-buttons" className={'m-0'}>
                            <HelpButton />
                            <RemoveDataButton />
                            <LanguageSelection />
                        </ButtonGroup>
                    </ButtonToolbar>
                </ButtonToolbar>
            </div>
            {showModal && <BackToStartDialog closeModal={() => setShowModal(false)} />}
        </Row>
    );
};
