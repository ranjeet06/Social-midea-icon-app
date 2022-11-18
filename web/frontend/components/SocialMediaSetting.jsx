import {
    Card,
    Stack,
    Heading,
    Icon,
    Button,
    ButtonGroup,
    Form,
    FormLayout,
    TextField,
} from "@shopify/polaris";
import { DeleteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

export function SocialMediaSetting() {

    const [SocialMideaIcon, setSocialMideaIcon] = useState({
        platform: "",
        url: "",
    });
    const [inputList, setInputList] = useState([]);
    const [inputData, setInputData] = useState([]);

    const Input = () => {
        return <Card>

            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <Stack>
                        <input type="text" className="inputField" onChange={handleChange} name="platform" />
                        <input type="text" className="inputField" onChange={handleChange} name="url" />
                        <ButtonGroup>
                            <Button onClick={handleCancelBtnClick}>Cancel</Button>
                            <Button primary submit>Submit</Button>
                        </ButtonGroup>
                    </Stack>
                </FormLayout>
            </Form>

        </Card>;
    };


    const Data = () => {
        return <Card>
            <Stack>
                <Stack.Item fill>
                    <Heading>{SocialMideaIcon.platform}</Heading>
                </Stack.Item>

                <Stack.Item>
                    <Button plain onClick={handleDeleteBtnClick}>
                        <Icon source={DeleteMinor}
                            color="base"
                        />
                    </Button>
                </Stack.Item>
            </Stack>

            <TextField
                value={SocialMideaIcon.url}
            />
        </Card>;
    };

    const onAddBtnClick = event => {
        setInputList(<Input key={inputList.length} />);
    };

    const handleChange = (event) => {
        const name = event.target.name
        setSocialMideaIcon(prvInfo => {
            return {
                ...prvInfo,
                [name]: event.target.value,
            }
        });
    };

    const handleSubmit = useCallback(async () => {

        const response = await fetch(`https://ranjeetprasad123.myshopify.com/admin/api/socialmideaicons`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": "shpua_3b188aa6caf3640f0ac08f74baf853fd" },
            body: JSON.stringify(SocialMideaIcon)
        });
        if (response.ok) {
            alert(response)
            makeClean();
            setInputData((<Data key={inputData.length} />));
            setInputList([]);
        }
        setInputData(inputData.concat(<Data key={inputData.length} />));
        setInputList([]);
    });

    const handleDeleteBtnClick = useCallback(async () => {
        reset();
        setIsDeleting(true);
        const response = await fetch(`/api/socialmideaicons/${SocialMideaIcon.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    });


    const handleCancelBtnClick = event => {
        setInputList([]);
    };


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
                {inputData}
                {inputList}
            </Card>
        </Card>
    );
}
