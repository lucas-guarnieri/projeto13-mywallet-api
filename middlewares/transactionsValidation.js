export function transactionsValidation(req, res, next){
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) {
        res.sendStatus(401);
        return;
    }
    
    next();
}