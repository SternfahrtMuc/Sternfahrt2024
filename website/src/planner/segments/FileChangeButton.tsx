import { Dropdown } from 'react-bootstrap';
import exchange from '../../assets/exchange.svg';
import { gpxSegmentsActions } from '../store/gpxSegments.reducer.ts';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { optionallyCompress } from '../store/compressHelper.ts';

interface Props {
    id: string;
    name: string;
}
export function FileChangeButton({ id, name }: Props) {
    const dispatch = useDispatch();
    // const uploadInput = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => setIsLoading(false), 2000);
        }
    }, [isLoading]);

    // const buttonClicked = () => {
    //     const current = uploadInput.current;
    //     if (current) {
    //         current.click();
    //     }
    // };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length === 1) {
            files[0]
                ?.text()
                .then((newContent) =>
                    dispatch(
                        gpxSegmentsActions.changeGpxSegmentContent({ id, newContent: optionallyCompress(newContent) })
                    )
                )
                .then(() => setIsLoading(true))
                .catch(console.error);
        }
    };

    return (
        <Dropdown.Item onClick={() => changeHandler} title={`Change file for the segment "${name}"`}>
            <img src={exchange} alt="exchange" className="m-1" />
            <span>Replace segment with other file(s)</span>
        </Dropdown.Item>
    );
}
