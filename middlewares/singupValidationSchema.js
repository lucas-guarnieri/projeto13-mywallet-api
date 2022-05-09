import joi from "joi";


export function singupValidation(req, res, next){
    const user = req.body;

    const userSingUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        passwordConfirm: joi.ref("password")
    });
    const validation = userSingUpSchema.validate(user);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }
    next();
}
