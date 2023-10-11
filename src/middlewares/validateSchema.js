export default function validateSchema(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            let errorMessage = ""
            validation.error.details.forEach(det => 
                errorMessage += det.message + " "
            )
            return res.status(422).send(errorMessage)
        }
        next();
    }
}