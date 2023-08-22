import { createContext } from "react";
import { Action, Report } from "../app/types";

type ContextHooks = {
    action: Action,
    setAction: (newAction: Action) => void,
    reports: Report[],
    setReports: (reports: Report[]) => void
}

export const AppContext = createContext<ContextHooks|null>(null)