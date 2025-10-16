export type VisitType = "warehouse" | "office" | "r&d";
export type OperationType = "load" | "unload";


export interface VisitorForm {
    visitType?: VisitType;
    opType?: OperationType;
    company: string;
    licensePlate: string;
    language?: string;
}

export const isValidVisitorForm = (req: VisitorForm) => {
    if (!req.visitType || !req.company || !req.licensePlate) return false;

    if (req.visitType === "warehouse") {
        return !!req.opType;
    } else {
        return req.opType === undefined || req.opType === null;
    }
};

export type FormState = VisitorForm & { visitType?: VisitType };
