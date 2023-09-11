import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {

    if (error.type === "conflict") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }

    if (error.type === "notFound") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }

    if (error.type === "invalid_date") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    if (error.type === "unprocessable_entity") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message)
    }

    if(error.type === "bad_request") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
}