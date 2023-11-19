const express = require('express');
const router = express.Router();

const _names = ["Balázs", "Kriszti", "Lilla", "Geri", "Marci", "Ádám", "Peti", "Sanyi", "Palázs", "Laci"];
let names = [..._names];

/**
 * @swagger
 * /api/draw:
 *   get:
 *     summary: Draw a name
 *     description: Draws a name from the Christmas list
 *     parameters:
 *       - name: user
 *         in: query
 *         required: true
 *         type: string
 *         description: The name of the current user (You)
 *     responses:
 *       200:
 *         description: Successful response with a name
 *       400:
 *         description: The user was not provided as a parameter.
 *       202:
 *         description: There're no appropiate users in the Christmas list for the request. It's either empty, or only the current user remained.
 */
router.get('/draw', (req, res) => {
    const {user} = req.query;
    
    if(!user)
    {
        return noUserProvided(res);
    }

    let index = getRandomNumber(0, names.length);
    let name = drawName(index);

    let tries = 0;
    while(name === user)
    {
        if(tries >= 5) return noMatchForUser(res);

        index = getRandomNumber(0, names.length);
        name = drawName(index);

        tries++;
    }

    removeFromArray(index);

    if(!name) res.status(202).send("No more names on the list :(")
    return res.send(name);
});

/**
 * @swagger
 * /api/reset:
 *   post:
 *     summary: Reset the list
 *     description: Resets the Christmas list to its original state
 *     responses:
 *       200:
 *         description: Successful
 */
router.post('/reset', (req,res) => {
    names = [..._names];
    res.send("Successful");
})


const drawName = (index) => {
    return names[index];
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const removeFromArray = (index) => {
    return names.splice(index, 1);
}

const noUserProvided = (res) => {
    res.status(400).send("No user was provided. Please provide the user name in the query parameters!")
}

const noMatchForUser = (res) => {
    res.status(202).send("No proper name found for the provided user");
}


module.exports = router;