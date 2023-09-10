export function conflictError(resource = "Item") {
    return {
        type: "conflict",
        message: `${resource} já existe!`
    };
}

