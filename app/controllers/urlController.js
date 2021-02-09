const Url = require('../models/url')

module.exports.list = (req, res) => {
    Url.find()
        .then((urls) => {
            res.json(urls)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
     Url.findById(id)
        .then((url) => {
            if (url) {
                res.json(url)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const url = new Url(body)
    url.save()
        .then((url) => {
            res.json(url)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((url) => {
            res.json(url)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Url.findByIdAndDelete(id)
        .then((url) => {
            res.json(url)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.shift = (req,res)=>{
    const hash = req.params.hash
    const userData = req.useragent
    let device = ''

     if(userData.isMobile){
         device = 'Mobile'
     }
     else if(userData.isDesktop){
         device = 'Desktop'
     }


    const clicks = {
        ipAddress : req.ip,
        browser : userData.browser,
        platform : userData.platform,
        device
    }
     console.log('clicksvalue',clicks)
    Url.findOneAndUpdate ({'hashedUrl' : hash}, {$push : {clicks}})
    .then((data)=>{
        console.log(data)
        res.redirect(data.originalUrl)

    })  
    .catch((err) => {
        res.json(err)
    })  
}

