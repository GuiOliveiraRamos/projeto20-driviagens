export function notFound(resource = "Item") {
    return {
        type: "not_found",
        message: `${resource}`,
    };
}