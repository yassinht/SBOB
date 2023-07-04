const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require("bcrypt");

const { FormsEtude } = require('../models/formEtude');
const multer = require('multer');
const { verifyToken } = require('../middlewares/verifyToken');
const { isValidObjectId } = require('mongoose');

const router = express.Router();



let filename1 = [];

const storage = multer.diskStorage(
    {
        destination: './upload',
        filename: function (req, file, cb) {
            date = Date.now();
            cb(null, date + '.' + file.mimetype.split('/')[1]);
            let fl = date + '.' + file.mimetype.split('/')[1];
            filename1.push(fl);
        },
    }
);

const upload = multer({ storage: storage });




router.post('/upload', upload.any('image'), (req, res) => {
    let imagePath = filename1[0];
    filename1 = [];
  /*   console.log(imagePath); */
    res.send({ image: imagePath });


});


        
router.get("/search/:key",async (req,resp)=>{

    let data = await FormsEtude.find(

        {

            "$or":[

                {title:{$regex:new RegExp("^" + req.params.key.toLowerCase(), "i")}},

            ]

        }

    ).sort().skip(req.body.a).limit(req.body.b);

    resp.send(data);

    

});


router.get('/getformskip/:page', verifyToken, async (req, res) => {
const { page = 1 } = req.params;
const limit = 10;

// core data , total , current 
try {
    const formsPages = await FormsEtude.find().limit(limit).skip((page - 1) * limit).exec();
    const count = await FormsEtude.countDocuments();
    res.json({
    formsPages,
    totalPages : Math.ceil(count / limit),
    currenPage : Number(page),
    });
} catch (error) {
    res.sendStatus(500).json({'msg' : 'Server Error'});
}
});

router.post('/addforms', verifyToken, async (req, res) => {
     console.log("req.body-form etde",req.body)
  
    try {
       
        let form = await FormsEtude.find({ title: req.body.title });

        if(form.length==0){
    
        let obj = req.body;
        ///console.log("obj",req.body)
        let forms = new FormsEtude(obj);
        //console.log("forms",forms)
 /*        console.log("forssssssssssms",1) */
        forms.created_date = new Date();
        forms.update_date= new Date(),
        forms.status = true;
     /*    console.log("forssssssssssms",req.body.calculeFormule) */
        forms.formMuti=req.body.calculeFormule;
     /*    console.log("forssssssssssms",3) */
        forms.archived = false;
    /*     console.log("forssssssssssms",4) */
        forms.password = '';
      
        forms.nameAff = [{Aff1:"Aucune dossier",checked:false}],
        forms.nameAff2 =[{Aff1:"Aucune dossier",checked:false}],
        forms.dossierAff=[{nameDossier:"Aucune dossier",id:""}],
        forms.etat=false;
      console.log("forssssssssssms",5) 
        let savedForms = await forms.save()

        res.status(200).send(savedForms);}
        else{
     
            res.status(200).send(false);
        }

    } catch (error) {
 
        res.status(400).send({ message: "Erreur", error });
        console.log("error addformetude",error)
    }

});

router.get('/getforms', verifyToken, async (req, res) => {
/* console.log("uuuuu",res) */
    try {

        let forms = await FormsEtude.find({ archived: false }).sort({ 'created_date': -1 })
       /*   console.log("uuuuu",forms.length)  */
        res.status(200).send(forms);

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});
router.get("/search/:key",async (req,resp)=>{
    let data = await FormsEtude.find(
        {
            "$or":[
                {title:{$regex:new RegExp(req.params.key, "i") }},
            ]
        }
    ).sort().skip(req.body.a).limit(req.body.b);
    resp.send(data);

})

router.get('/getforms/:a/:b', verifyToken, async (req, res) => {
    /* console.log("uuuuu",res) */
        try {
         /*    console.log("uuuuu",req.body.a) */
            let forms = await FormsEtude.find({ archived: false }).sort().skip(req.body.a).limit(req.body.b);
          /*  console.log("uuuuu",forms)  */
            let tabForms = []
          for (let i = 0; i < forms.length; i++){
             /*  console.log(forms[i].title) */
              tabForms.push(forms[i])
          } 
            res.status(200).send({forms :forms.length , totalLength : forms.length});
    
        } catch (error) {
            res.status(400).send({ message: "Erreur", error });
        }
    
    });

router.get('/getformsaffec', verifyToken, async (req, res) => {

    try {

        let forms = await FormsEtude.find({ etat: true }).sort({ 'title': 1 })

        res.status(200).send(forms);


    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});

router.get('/getformbygender/:gender', verifyToken, async (req, res) => {

    try {
        let gender = req.params.gender;
        let forms = await FormsEtude.find({ archived: false, genre: gender }).sort({ 'title': 1 })

        res.status(200).send(forms);

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});
router.get('/getformsfromarchive', verifyToken, async (req, res) => {

    try {

        let forms = await FormsEtude.find({ archived: true }).sort({ 'title': 1 })

        res.status(200).send(forms);

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});
router.put('/updateforms/:id', async (req, res) => {
  /*  console.log('eee',new Date()) */

    try {
        let form = await FormsEtude.find({ title: req.body.title });
        let id = req.params.id;
        let data = req.body;
   /*      console.log(form.length) */
 /*  console.log('eee',data)  */
    if(form.length==0 || form.length != 0 && data._id==form[0]._id){
/*         console.log('ghjklkkjkkjjk') */
        const salt = bcrypt.genSaltSync(10);
        // now we set user password to hashed password
        password = bcrypt.hashSync(data.password, salt);


        let formToUpdate = await FormsEtude.findOne({ _id: id });
        if (formToUpdate && formToUpdate.password.length > 0) {
            if (bcrypt.compareSync(data.password, formToUpdate.password)) {
                let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: id }, {
                    $set: {
                        title: data.title,
                        description: data.description,
                        created_date: data.date,
                        update_date: new Date(),
                        etat:data.etat,
                        nameAff:data.nameAff,
                        sections: data.sections,
                        genre:data.genre,
                        formMuti: data.formMuti,
                        messages: data.messages,
                        formule: data.formule,
                        dossierAff:data.dossierAff
                    }
                })
                if (!updatedForm) {
                    console.log('err');
                    res.status(404).send('not found')
                } else {
                    res.status(200).send(updatedForm);
                }
            } else {

                console.log('err');
                res.status(404).send('not found')

            }
        } else {
            let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: id }, {
                $set: {
                    title: data.title,
                    description: data.description,
                    created_date: data.created_date,
                    update_date: new Date(),
                    etat:data.etat,
                    genre:data.genre,
                    nameAff:data.nameAff,
                    sections: data.sections,
                    formMuti:data.formMuti,
                    messages: data.messages,
                    formule: data.formule,
                    dossierAff:data.dossierAff
                }
            })
            if (!updatedForm) {
                res.status(404).send('not found')
            } else {
                res.status(200).send(updatedForm);
            }
        }
    }else {
/*         console.log('hhhhhhhhhhhhhhh') */
        res.status(200).send(false);
    }
      






    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});

router.get('/archived/:id', verifyToken, async (req, res) => {

    try {
        let id = req.params.id;

        let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: id }, { $set: { archived: true, new: true } })

        if (!updatedForm) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(updatedForm);
        }
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});


router.get('/restorer/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;

        let updatedForms = await FormsEtude.findByIdAndUpdate({ _id: id }, { $set: { archived: false } })

        if (!updatedForms) {
            res.status(404).send({ message: "Not found" })
        } else {
            res.status(200).send(updatedForms);
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});

router.get('/getformsbyid/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(404).send('not found')
        }

        let form = await FormsEtude.findOne({ _id: id, archived: false })
         /*   console.log("fodjdd",form) */
        if (!form) {
            res.status(404).send('not found')
        } else {

            res.status(200).send(form)
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});


router.get('/delete/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;
        deleteFiles(id);

        let form = await FormsEtude.findByIdAndDelete({ _id: id })

        if (!form) {
            res.status(404).send('not found')
        } else {

            res.status(200).send(form)
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});


router.put('/updatepassword/:id', verifyToken, async (req, res) => {

    try {

        let id = req.params.id;
        let data = req.body;

        const salt = bcrypt.genSaltSync(10);
        // now we set user password to hashed password
        password = bcrypt.hashSync(data.password, salt);


        let formToUpdate = await FormsEtude.findOne({ _id: id });

        if (formToUpdate && bcrypt.compareSync(data.password, formToUpdate.password)) {
            let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: id }, {
                $set: {
                    password: '',
                }
            })

            if (!updatedForm) {
                res.status(404).send('not found')
            } else {
                res.status(200).send(updatedForm);
            }
        } else {
            res.status(404).send('not found')
        }



    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});


router.put('/newpassword/:id', verifyToken, async (req, res) => {

    try {

        let id = req.params.id;
        let data = req.body;

        const salt = bcrypt.genSaltSync(10);
        // now we set user password to hashed password
        password = bcrypt.hashSync(data.password, salt);

        let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: id }, {
            $set: {
                password: password,
            }
        })

        if (!updatedForm) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(updatedForm);
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});



async function deleteFiles(id) {

    let form = await FormsEtude.findOne({ _id: id })

    if (form && form.sections && Array.isArray(form.sections)) {
        Array.from(form.sections).forEach(section => {
            if (section.questions && Array.from(section.questions)) {
                for (let q of section.questions) {
                    if (q.options && Array.isArray(q.options)) {
                        for (let o of q.options) {
                            if (o.image && o.image.length > 1) {
                                fs.unlink('./upload/' + o.image, function (err) {
                                   /*  console.log(o.image); */
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            }
                        }
                    }
                }
            }
        })
    }
}


router.post('/deletemany', (req, res) => {
    images = req.body.images;
    for (let img of images) {
        fs.unlink('./upload/' + img, function (err) {
         /*    console.log(img); */
            if (err) {
                console.error(err);
                return res.status(400).send({ message: "Erreur", error: err })
            }
        });
    }
    return res.status(200).send({ message: "Deleted successfully" })
});




module.exports = router;