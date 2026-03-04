import { Module } from "@com.mgmtp.a12.client/client-core/lib/core/application";

import PlaygroundView from "./PlaygroundView";

function viewComponentProvider(name: string) {
    if (name === "PlaygroundView") {
        return PlaygroundView;
    }
    return undefined;
}

const module = (): Module => ({
    id: "PlaygroundModule",
    views: () => viewComponentProvider
});

export default module;
