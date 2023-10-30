import { ButtonGroup, ButtonToolbar, Container, Row } from 'react-bootstrap';
import { HelpButton } from './tutorial/HelpButton.tsx';
import { RemoveDataButton } from './RemoveDataButton.tsx';
import { LoadExampleDataButton } from './LoadExampleDataButton.tsx';

export const AppHeader = () => {
    return (
        <div className="footer-copyright text-center py-3">
            <Container fluid>
                <Row>
                    <h1>Rally GPX Merger</h1>
                </Row>
                <Row>
                    <ButtonToolbar className="justify-content-end" aria-label="Toolbar with Button groups">
                        <ButtonToolbar aria-label="Toolbar with Button groups">
                            <ButtonGroup aria-label="help-buttons">
                                <HelpButton />
                                <LoadExampleDataButton />
                                <RemoveDataButton />
                            </ButtonGroup>
                        </ButtonToolbar>
                    </ButtonToolbar>
                </Row>
            </Container>
        </div>
    );
};
