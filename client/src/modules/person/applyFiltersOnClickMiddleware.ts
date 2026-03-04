import { StoreFactories } from "@com.mgmtp.a12.client/client-core/lib/core/store";
import {
    OverviewEngineActions,
    OverviewEngineSelectors
} from "@com.mgmtp.a12.overviewengine/overviewengine-core/lib/main/client-extensions";
import { Events } from "@com.mgmtp.a12.overviewengine/overviewengine-core/lib/main/store";
import { OverviewEngineApi } from "@com.mgmtp.a12.overviewengine/overviewengine-core/lib/main/view/api";

const quickFilterMap = new Map<string, OverviewEngineApi.FilterMap>([
    [
        "filter_millenials",
        {
            "/Person/PersonalData/DateOfBirth": {
                filterType: "Date",
                type: "Date",
                criteria: {
                    start: new Date("1981-01-01"),
                    end: new Date("1996-12-31")
                }
            }
        }
    ],
    [
        "filter_generation_z",
        {
            "/Person/PersonalData/DateOfBirth": {
                filterType: "Date",
                type: "Date",
                criteria: {
                    start: new Date("1997-01-01"),
                    end: new Date("2012-12-31")
                }
            }
        }
    ]
]);

export const applyFiltersOnClickMiddleware = StoreFactories.createMiddleware((api, next, action) => {
    if (
        OverviewEngineActions.event.match(action) &&
        Events.onEventButtonClicked.match(action.payload.engineAction) &&
        action.payload.engineAction.payload.event.includes("filter_")
    ) {
        const quickFilters = quickFilterMap.get(action.payload.engineAction.payload.event);
        const state = api.getState();
        const uiState = OverviewEngineSelectors.uiStateWithoutDefaults(action.payload.activityId)(state);
        const activeFilters = uiState ? uiState.activeFilters : {};
        api.dispatch(
            OverviewEngineActions.event({
                activityId: action.payload.activityId,
                engineAction: Events.onFilterChanged({
                    activeFilters: { ...activeFilters, ...quickFilters }
                })
            })
        );
    }
    return next(action);
});
