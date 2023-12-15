import { Form } from 'react-bootstrap';
import { GpxSegment } from '../../store/types.ts';
import { useDispatch } from 'react-redux';
import { gpxSegmentsActions } from '../../store/gpxSegments.reducer.ts';
import { FileDownloader } from './FileDownloader.tsx';
import { FileChangeButton } from './FileChangeButton.tsx';
import { RemoveFileButton } from './RemoveFileButton.tsx';

export function FileDisplay({ gpxSegment }: { gpxSegment: GpxSegment }) {
    const { id, filename, content } = gpxSegment;
    const dispatch = useDispatch();

    return (
        <tr>
            <td>
                <Form.Control
                    type="text"
                    placeholder="People at start"
                    value={filename}
                    onChange={(value) => dispatch(gpxSegmentsActions.setFilename({ id, filename: value.target.value }))}
                />
            </td>
            <td>
                <FileDownloader content={content} name={filename} id={id} onlyIcon={true} />
                <FileChangeButton id={id} name={filename} />
                <RemoveFileButton id={id} name={filename} />
            </td>
        </tr>
    );
}