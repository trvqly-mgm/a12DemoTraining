import {
    Module,
} from "@com.mgmtp.a12.client/client-core/lib/core/application";

import PlaygroundView from "./PlaygroundView";

/**
 * Get all modules.
 */
function viewComponentProvider(name: string) {
    if (name === "PlaygroundView") {
        return PlaygroundView;
    }
    return undefined;
}

export const playgroundModule = (): Module => ({
    id: "PlaygroundModule",
    views:()=> viewComponentProvider,
});
