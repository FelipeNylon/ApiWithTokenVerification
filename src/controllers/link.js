const {Router} = require('express');
const {Link} = require('../models')

const router = Router()



router.get('/', async (req, res) => {
    const {accountId} = req
    const links = await Link.findAll({where: {accountId}})


    return res.jsonOk(links)
})

router.post('/', async (req,res) => {
    const {accountId, body} = req //req.id
    const {label, url, isSocial} = body

    const image = 'https://google.com/image.jpg'

    const link = await Link.create({label, url, isSocial, image, accountId})
    return res.jsonOk(link)
})

router.put('/:id', async (req,res) => {
    const {accountId,body } = req //req.id
    const {id} = req.params;
    const fields = ['label', 'url', 'isSocial']

    const link = await Link.findOne({where : {id, accountId}})

    if(!link) return res.jsonNotFound();
    fields.map((FieldName)=> {
       const newValue = body[FieldName]

        if(newValue != undefined) link[FieldName] = newValue 

    });

    await link.save();

    return res.jsonOk(link)


})

router.delete('/:id', async (req, res) => {
    const {accountId} = req //req.id
    const {id} = req.params;
    const link = await Link.findOne({where : {id, accountId}})

    if(!link) return res.jsonNotFound();

    await link.destroy();
    return res.jsonOk()
})

module.exports = router