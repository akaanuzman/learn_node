const express = require("express")
const router = express.Router()
const db = require("../data/db")

/// Nodejs route struct
router.get("/products/:id", async (req, res) => {
    try {
        const [products,] = await db.execute("select * from Products where id=?", [req.params.id])
        res.render("product_details", {
            products: products[0]
        })
    } catch (err) {
        console.error(err)
    }
});

router.get("/products", (req, res) => {
    try {
        fetchData(res, "select * from Products where isActive = 1", "products")
    } catch (err) {
        console.error(err)
    }
});

router.get("/", (req, res) => {

    /// MARK: Async - await usage
    try {
        fetchData(res, "select * from Products where isHome = 1 and isActive = 1", "index")
    } catch (err) {
        console.error(err)
    }

    /// MARK: Then - catch usage
    // db.execute("select * from Products")
    //     .then(response => {
    //         console.log(response[0]);
    //         res.render("index", {
    //             products: response[0]
    //         })
    //     })
    //     .catch(err => console.error(err))
});

async function fetchData(res, query, pageUrl) {
    const [products,] = await db.execute(query)
    res.render(pageUrl, {
        products: products
    })
}

module.exports = router;