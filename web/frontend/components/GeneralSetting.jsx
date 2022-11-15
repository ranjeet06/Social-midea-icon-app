import {
    Card,
} from "@shopify/polaris";
import { useState } from "react";



export function GeneralSetting() {

    const [text, setText] = useState("App desabled");

    function handleChange() {

        if (text === "App enabled") {
            setText("App desabled");
        } else {
            setText("App enabled");
        }
    }

    return (
        <Card sectioned title="General Setting">
            <h2>{text}</h2>
            <label class="switch">
                <input type="checkbox" onChange={handleChange} />
                <span class="slider1 round"></span>
            </label>
        </Card>
    );
}

