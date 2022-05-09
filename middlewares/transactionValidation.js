import joi from "joi";

export function transactionValidation(req, res, next){
    const transaction = req.body;
    const { authorization } = req.headers;

    const transactionSchema = joi.object({
        amount: joi.number().required(),
        description: joi.string().required()
    })
    const validation = transactionSchema.validate(transaction);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }

    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) {
        res.sendStatus(401);
        return;
    }
    
    next();
}
