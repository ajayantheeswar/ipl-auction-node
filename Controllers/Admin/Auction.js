const AdminUser = require('../../Models/AdminUser');
const Auction = require('../../Models/Auction');
const Bid = require('../../Models/Bid')
const Profilepath = require('../../Utils/Profile');
const User = require('../../Models/User');

const {bucket} = require('../../firebase');


exports.createAuction = async (req,res,next) => {
    try{
        const { name , battingStyle , average , role ,start , end} = req.body;

        const profileImageFile = req.file;
        console.log('file : ');
        console.log(profileImageFile);
        console.log('file : ');

        const profileURL = await profileUpload(profileImageFile)

        const auctionRequest =  { name ,
            battingStyle ,
            average ,
            role ,
            start,
            end ,
            profile : profileURL
          };
       
       auction = await req.user.createAuction(auctionRequest);

       if(!auction){
            res.status(401).json({ error : "Auction Could Not be created"})
            return 
        }
        res.status(200).json(
            {
                message : "Auction Created"
            }
        );
     }catch(err){
        res.status(401).json({ error : "--Auction Could Not be created" + err.message })
     }
}

exports.getAllAuctions = async (req,res,next) => {
    try{
        
        const auctions = await req.user.getAuctions();
        if(!auctions){
            res.status(401).json({ error : "Auction Could Not be fectched"})
            return 
        }
        res.status(200).json(
            {
                message : "Fetch Created",
                Auctions : auctions
            }
        );
     }catch(err){
        res.status(401).json({ error : "--Auction Could Not be created" + err.message })
     }
}

exports.getAuction = async (req,res,next) => {
    
    try{
        const { auctionId } = req.body.AuctionDetails
        const auction = await Auction.findByPk(auctionId,{
            include : {
                model : Bid,
            }
        })
        if(!auction){
            res.status(401).json({ error : "Auction Does not exists"})
            return 
        }
        res.status(200).json(
            {
                message : "Fetch Success",
                auction : auction
            }
        );
     }catch(err){
        res.status(401).json({ error : "--Auction Could Not be fetched" + err.message })
     }

}





const profileUpload = async (file) => new Promise( (resolve,reject) => {

    try {
        const {originalname,buffer} = file;

        const blob = bucket.file(originalname);
        const blobSteam = blob.createWriteStream({
            resumable : false
        })
            .on('finish', () => {
                
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;   
                console.log(publicUrl);
                resolve(publicUrl)
            })

            .on('error', () => {
                reject(`Unable to upload image, something went wrong`)
            })

            .end(buffer);
        }
    catch(err) {
        reject(err.message)
    }
    

} ) 
