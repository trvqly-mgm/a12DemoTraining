import {Button} from "@com.mgmtp.a12.widgets/widgets-core";
import {generateUid} from "@com.mgmtp.a12.widgets/widgets-core/lib/common";
import {Icon} from "@com.mgmtp.a12.widgets/widgets-core/lib/icon";
import {useDispatch} from "react-redux";
import {createDummyDocument, CreatePayload} from "./createSaga";

import {useLocalizer} from "../../localization";

const PlaygroundView = () => {
    const dispatch  = useDispatch();
    const localizer = useLocalizer();
    const payload: CreatePayload = {
        documentModelName: "Person_DM",
        document: {
            Person: {
                PersonalData: {
                    FirstName: "John",
                    LastName: "Doe",
                    PlaceOfBirth: null,
                    EmailAddress: "john.doe@example.com",
                },
            },
        },
        locale: "en",
    };

    return (

        <div style={{ padding: "24px" }}>
            <h1>{localizer("application.playground.title")}</h1>
            <Button label="search" secondary id={generateUid()} icon={<Icon>search</Icon>}
                    onClick={() => dispatch(createDummyDocument(payload))}
            />
        </div>
    );
};

export default PlaygroundView;