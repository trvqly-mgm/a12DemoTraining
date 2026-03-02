import actionCreatorFactory, {ActionCreator} from "typescript-fsa";
import { takeEvery } from "typed-redux-saga";
import { SagaIterator } from "redux-saga";
import { Action } from "typescript-fsa";

export interface CreatePayload {
    message: string;
}

const factory = actionCreatorFactory();

export const createDummyDocument:ActionCreator<CreatePayload> = factory<CreatePayload>("CREATE_DUMMY_DOCUMENT");

export function* createSaga(): SagaIterator {
    yield* takeEvery(createDummyDocument, createWorker);
}

export function* createWorker(action: Action<CreatePayload>) {
    console.log(action.payload.message);
}