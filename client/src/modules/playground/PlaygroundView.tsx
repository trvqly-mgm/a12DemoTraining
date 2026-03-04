import { ReactElement } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@com.mgmtp.a12.widgets/widgets-core";
import { Icon } from "@com.mgmtp.a12.widgets/widgets-core/lib/icon";

import { RESOURCE_KEYS, useLocalizer } from "../../localization";

import { createDummyDocument, CreatePayload } from "./createSaga";

export default function PlaygroundView(): ReactElement {
    const dispatch = useDispatch();
    const localizer = useLocalizer();
    const payload: CreatePayload = {
        documentModelName: "Person_DM",
        document: {
            Person: {
                PersonalData: {
                    FirstName: "Max",
                    LastName: "Mustermann",
                    EmailAddress: "max.mustermann@mgm-tp.com"
                }
            }
        },
        locale: "en"
    };
    return (
        <div>
            <h1>{localizer(RESOURCE_KEYS.application.playground.title)}</h1>
            <Button
                label={localizer(RESOURCE_KEYS.application.playground.buttonText)}
                primary
                icon={<Icon>add</Icon>}
                //className={"h_purpleBG"}
                onClick={() => dispatch(createDummyDocument(payload))}
            />
        </div>
    );
}
