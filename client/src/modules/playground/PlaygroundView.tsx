import {Button} from "@com.mgmtp.a12.widgets/widgets-core";
import {generateUid} from "@com.mgmtp.a12.widgets/widgets-core/lib/common";
import {Icon} from "@com.mgmtp.a12.widgets/widgets-core/lib/icon";
import {useDispatch} from "react-redux";
import {createDummyDocument} from "./createSaga";


const PlaygroundView = () => {
    const dispatch  = useDispatch();
    const payload =  {
        message: "Hello from the playground!"
    }

    return (

        <div style={{ padding: "24px" }}>
            <h1>this is for the button</h1>
            <Button label="search" secondary id={generateUid()} icon={<Icon>search</Icon>}
                    onClick={() => dispatch(createDummyDocument(payload))}
            />
        </div>
    );
};

export default PlaygroundView;