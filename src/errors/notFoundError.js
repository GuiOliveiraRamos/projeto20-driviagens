export function notFound(resource = "Item") {
    return {
        type: "notFound",
        message: `${resource}`,
    };
}