const home = (req, res, next) => {
    res.json(
        {
            message: "Questions Home Page"
        }
    )
}

const onDelete = (req, res, next) => {
    res.json(
        {
            success: true,
            message: "Questions were deleted!"
        }
    )
}

const onUpdate = (req, res, next) => {
    res.json(
        {
            success: true,
            message: "Question was updated!"
        }
    )
}

module.exports = { home, onDelete, onUpdate }