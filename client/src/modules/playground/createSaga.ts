import actionCreatorFactory, {ActionCreator} from "typescript-fsa";
import { takeEvery } from "typed-redux-saga";
import { SagaIterator } from "redux-saga";
import { Action } from "typescript-fsa";
import {
    DocumentJsonRpc2Request,
    JsonRpc2Request,
} from "@com.mgmtp.a12.dataservices/dataservices-access";
import { ConnectorLocator } from "@com.mgmtp.a12.utils/utils-connector";
import {RestServerConnector} from "@com.mgmtp.a12.utils/utils-connector/lib/main";

export interface CreatePayload {
    documentModelName: string;
    document: {
        Person: {
            PersonalData: {
                FirstName: string;
                LastName: string;
                PlaceOfBirth: string | null;
                EmailAddress: string;
            },
        },
    };
    locale: string;
}

const factory = actionCreatorFactory();

export const createDummyDocument:ActionCreator<CreatePayload> = factory<CreatePayload>("CREATE_DUMMY_DOCUMENT");

export function* createSaga(): SagaIterator {
    yield* takeEvery(createDummyDocument, createWorker);
}

export function* createWorker(action: Action<CreatePayload>) {
    const request: DocumentJsonRpc2Request.AddJsonRpc2Request = {
        id: "any",
        jsonrpc: "2.0",
        method: "ADD_DOCUMENT",
        params: action.payload
    };

    const serverConnector = ConnectorLocator.getInstance().getServerConnector() as RestServerConnector;

    serverConnector.fetchData(JsonRpc2Request.build([request])).then((response) => {
        if (response.ok){
            console.log("Document created successfully:", response);
        }
    });

}