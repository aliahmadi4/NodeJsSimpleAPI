const express = require('express');
const urlEncodedParser = express.urlencoded({ extended: true });
const multer = require('multer');
const jsonParser = express.json();
const router = express.Router({ caseSensitive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/pics')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.jpg')
    }
})
function fileFilter(req, file, cb){
    if(file.mimetype=="image/jpeg"){
        cb(null, true)
    }else{
        // cb(null, false)
        cb(new Error('We accept just JPG file'))
    }
}

const students = [{ id: 1, name: "Ali Ahmadi", course: "Modern Web", picture: "1570418198494.jpg", grade: 100 }]
const myStudents = JSON.parse(JSON.stringify(students));

router.get('/', (req, res, next) => {
    res.send(myStudents)
})

router.get('/:id', (req, res) => {

    if (myStudents[req.params.id]) {
        res.send(myStudents[req.params.id]);
    } else {
        throw new Error("No Record Found!")
    }
})

function verification(req, res, next){
    if(req.body.id && req.body.name && req.body.course, req.body.grade){
        return next();
    }else{
        throw new Error('Please provide id, name, course, and grade!')
    }
}

router.post('/', jsonParser, verification, (req, res) => {
    myStudents.push(req.body)
    res.send(myStudents)
})

const upload = multer({ storage: storage, limits: {fileSize: 3145728}, fileFilter: fileFilter });
router.post('/img2', upload.single('file'), (req, res) => {
    res.send('uploaded')
})


router.post('/img', upload.single('file'), (req, res) => {
    console.log(req.file.filename);
    req.body.picture = req.file.filename;
    myStudents.push(req.body);
    res.send(myStudents)
})

router.delete('/:id', (req, res) => {
    if(myStudents[req.params.id]){
        myStudents.splice(req.params.id, 1);
        res.send(myStudents)
    }else{
        throw new Error("No Record Found to Delete!")
    }
    
})

router.put('/:id', jsonParser, (req, res) => {
    if(myStudents[req.params.id]){
        myStudents[req.params.id] = req.body;
        res.send(myStudents)
    }else{
        throw new Error("No Record Found to Update!")
    }
    
})



module.exports = router;