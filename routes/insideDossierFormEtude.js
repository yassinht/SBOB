const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//const { Inside } = require('../models/inside');
//const { Forms } = require('../models/forms');
//const { Dossier } = require('../models/dossier');

const { InsideDossierFormEtude } = require('../models/insideDossierformEtude');
const { verifyAdminToken } = require('../middlewares/verifyToken');
const { FormsEtude } = require('../models/formEtude');
const { DossierFormEtude } = require('../models/dossierFormEtude');

const router = express.Router();

router.post('/addinside', verifyAdminToken, async (req, res) => {
    try {
        obj = req.body;
       // console.log(1)
        let form = await FormsEtude.findOne({ _id: obj.form, archived: false });
      //  console.log("form",form.nameAff)
      //  console.log(" obj.nameDossier", obj.nameDossier)
      
        let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: obj.form, archived: false }, {
            $set: {
                nameAff : obj.nameDossier,
                nameAff2: obj.nameDossier,
                etat :true
            }
        })
    
  //  console.log("updatedForm",updatedForm.nameAff)  
        let dossier = await DossierFormEtude.findOne({ _id: obj.dossier, archived: false });
        if (!form || !dossier) {
            return res.status(404).send({ message: "Not found" })
        }
        let inside = new InsideDossierFormEtude(obj);
        inside.date = new Date();

        let aff = await InsideDossierFormEtude.findOne({ dossier: obj.dossier, form: obj.form })
     /*    console.log("aff",aff) */
        if (!aff) {
            await inside.save()
            res.status(200).send({ affected: 1 })
        } else {
            res.status(200).send({ affected: 0 });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }
});



router.post('/addinsideDossier', verifyAdminToken, async (req, res) => {
      try {
          obj = req.body;
          let form = await FormsEtude.findOne({ _id: obj.form, archived: false });
          /*
          let updatedForm = await Forms.findByIdAndUpdate({ _id: obj.form, archived: false }, {
              $set: {
                
                  dossierAff: obj.nameDossier,
                  etat :true
              }
          })
          */
          let dossier = await DossierFormEtude.findOne({ _id: obj.dossier, archived: false });
          if (!form || !dossier) {
              return res.status(404).send({ message: "Not found" })
          }
          let inside = new InsideDossierFormEtude(obj);
          inside.date = new Date();
  
          let aff = await InsideDossierFormEtude.findOne({ dossier: obj.dossier, form: obj.form })
          if (!aff) {
              await inside.save()
              res.status(200).send({ affected: 1 })
          } else {
              res.status(200).send({ affected: 0 });
          }
      } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Erreur", error });
      }
  });

router.get('/getinside/:dossier', verifyAdminToken, async (req, res) => {
    try {
        let dossier = await DossierFormEtude.findOne({ _id: req.params.dossier, archived: false });
        if (!dossier) {
            return res.status(404).send({ message: "Not found" })
        }
        let insides = await InsideDossierFormEtude.find({ dossier: req.params.dossier })
        res.status(200).send(insides);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});
  
router.get('/getmyform/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;

        let dossier = await DossierFormEtude.findOne({ _id: id, archived: false });
        if (!dossier) {
            return res.status(404).send({ message: "Not found" })
        }
/* console.log(1,dossier) */
        let insides = await InsideDossierFormEtude
            .aggregate(
                [
                    {
                        $match: {
                            dossier: ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: "formetudes",
                            localField: "form",
                            foreignField: "_id",
                            as: 'formetudes'
                        }
                    },
                    { "$sort": { "title": 1 } }
                ]
            )
        let forms = [];
       /*  console.log(12,insides) */
        for (let i = 0; i < insides.length; i++) {
           /*  console.log(insides[i]) */
           if (insides[i].formetudes[0] && !insides[i].formetudes[0].archived) {
                forms.push(insides[i].formetudes[0]);
            } 
        }
        res.status(200).send(forms)
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});

router.delete('/deleteinside/:dossier/:form/:type', verifyAdminToken, async (req, res) => {
    try {
        let form = await FormsEtude.findOne({ _id: req.params.form, archived: false });
 
        let dossier = await DossierFormEtude.findOne({ _id: req.params.dossier, archived: false });
        if (!form || !dossier) {
  
            return res.status(404).send({ message: "Not found" })
        }

        let deletedinside = await InsideDossierFormEtude.findOneAndDelete({ dossier: req.params.dossier, form: req.params.form})
        if(form.nameAff.length==1&&form.nameAff2.length==1 ||req.params.type=="aucun" ||req.params.type=="aucun"&& form.nameAff.length>1&&form.nameAff2.length>1){
        let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: req.params.form, archived: false }, {
            $set: {
                nameAff : [{Aff1:"Aucune dossier",checked:false}],
                nameAff2 :[{Aff1:"Aucune dossier",checked:false}],
                dossierAff:[{nameDossier:"Aucune dossier",id:""}],
                etat :false
            }

        })
      }else{
            let i=0;
            form.nameAff.map((resMap)=>{
              i++;
               if(resMap.Aff1==dossier.name){
               form.nameAff.splice(i-1,i)
               form.nameAff2.splice(i-1,i)
               }
            })
            let updatedForm = await FormsEtude.findByIdAndUpdate({ _id: req.params.form, archived: false }, {
                $set: {
                    nameAff : form.nameAff,
                    nameAff2 :form.nameAff2,
                    etat :false
                }
            })
        }
        if (!deletedinside) {
            res.status(404).send('not found')
        } else {
            
            res.status(200).send(deletedinside);
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});


module.exports = router;