import Joi from "joi";

export const schemaCity = Joi.object({
    name: Joi.string().min(2).max(50).required()   
});

export const schemaFlight = Joi.object({
    origin: Joi.number().integer().positive().required(),
    destination: Joi.number().integer().positive().required(),
    date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required()
})