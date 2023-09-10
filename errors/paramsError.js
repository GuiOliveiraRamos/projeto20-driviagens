export function paramsError() {
    return {
        type: "unprocessable_entity",
        message: 'smaller date e bigger date são obrigatórios.',
    };
}