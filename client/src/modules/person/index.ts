import { Module } from "@com.mgmtp.a12.client/client-core/lib/core/application";

import { applyFiltersOnClickMiddleware } from "./applyFiltersOnClickMiddleware";

const module = (): Module => ({
    id: "PersonModule",
    middlewares: () => [applyFiltersOnClickMiddleware]
});

export default module;
