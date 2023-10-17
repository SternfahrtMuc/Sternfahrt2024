import { DummyTable } from './DummyTable.tsx';
import { Button } from 'react-bootstrap';
import { FileDownloader } from './FileDownloader.tsx';

export function TrackMergeSection() {
    return (
        <div>
            <h4>Restructure files</h4>
            <div style={{ height: '70px' }}>
                <Button className={'m2'}>Merge Tracks</Button>
                <FileDownloader name={'test'} content={'1234'} />
                <Button className={'m2'}>Show Map</Button>
            </div>
            <DummyTable />
        </div>
    );
}
