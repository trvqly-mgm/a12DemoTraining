import actionCreatorFactory, { Action, ActionCreator } from "typescript-fsa";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "typed-redux-saga";

import {
    DocumentJsonRpc2Request,
    JsonRpc2Request,
    JsonRpc2Response
} from "@com.mgmtp.a12.dataservices/dataservices-access";
import { ConnectorLocator, RestServerConnector } from "@com.mgmtp.a12.utils/utils-connector/lib/main";
import { NotificationActions } from "@com.mgmtp.a12.client/client-core/lib/core/notification";

import { RESOURCE_KEYS } from "../../localization";

export interface CreatePayload {
    documentModelName: string;
    document: {
        Person: {
            PersonalData: {
                FirstName: string;
                LastName: string;
                EmailAddress: string;
            };
        };
    };
    locale: string;
}

const factory = actionCreatorFactory();
export const createDummyDocument: ActionCreator<CreatePayload> = factory<CreatePayload>("CREATE_DUMMY_DOCUMENT");

export function* createSaga(): SagaIterator {
    yield* takeEvery(createDummyDocument, createWorker);
}

function* createWorker(action: Action<CreatePayload>): SagaIterator {
    const request: DocumentJsonRpc2Request.AddJsonRpc2Request = {
        id: "create_document",
        jsonrpc: "2.0",
        method: "ADD_DOCUMENT",
        params: action.payload
    };
    const response: JsonRpc2Response[] = yield* call(makeRpcRequest, [request]);
    const severity = response.pop()?.error ? "error" : "success";
    yield* put(
        NotificationActions.add({
            title: {
                key: RESOURCE_KEYS.application.playground.notification.title[severity]
            },
            message: {
                key: RESOURCE_KEYS.application.playground.notification.message[severity]
            },
            severity: severity
        })
    );
}

async function makeRpcRequest(request: JsonRpc2Request[]): Promise<JsonRpc2Response[]> {
    const serverConnector = ConnectorLocator.getInstance().getServerConnector() as RestServerConnector;
    const requestPayload = JsonRpc2Request.build(request);
    const response = await serverConnector.fetchData(requestPayload);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
