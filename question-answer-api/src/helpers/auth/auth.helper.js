const isTokenIncluded = (req) => {
    return (req.headers['authorization']
        .startsWith("Bearer "))
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers['authorization']
    // [Bearer:] First index of list
    // [token] Second index of list
    const token = authorization.split(" ")[1]
    return token
}

export { isTokenIncluded, getAccessTokenFromHeader }