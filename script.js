import Router from express
const router = Router();


router.post('/',
   async (req, res) => {

    try{
        const data = req.body
        console.log('hello');
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error!");

    }
 });