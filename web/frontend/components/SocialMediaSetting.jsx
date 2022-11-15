import {
    Card,
    Stack,
    Heading,
    TextField,
    Icon,
} from "@shopify/polaris";
import { DeleteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

export function SocialMediaSetting() {

    const [value, setValue] = useState('Social media link');
    const [val, setVal] = useState('Title');
    const [inputList, setInputList] = useState([]);

    const Input = () => {
        return <Card>
            <Stack>
                <Stack.Item fill>
                    <input type="text" placeholder={val} />
                </Stack.Item>

                <Stack.Item>
                    <Icon source={DeleteMinor} color="base" />
                </Stack.Item>
            </Stack>

            <TextField
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
        </Card>;
    };

    function addLink() {

    }

    const onAddBtnClick = event => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
    };

    const handleChange = useCallback((newValue) => setValue(newValue), []);
    const handleChang = useCallback((newValue) => setVal(newValue), []);
    return (
        <Card sectioned title="Social media setting"
            actions={[
                {
                    content: "Add social midea link",
                    onAction: () => { onAddBtnClick() },
                },
            ]}
        >
            <p>The icon in your store will appear in this order.</p>

            <Card sectioned >

                {inputList}
            </Card>
        </Card>
    );
}
