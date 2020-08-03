const User = require('../../Models/User');
const Auction = require('../../Models/Auction');
const Bid = require('../../Models/Bid');
const Sequalize  = require('sequelize');


exports.createBid = async (req,res,next) => {
    try{
        const { BidDetails } = req.body;
        const BidRequest =  { 
            time : new Date().getTime(),
            amount : BidDetails.Amount,
            auctionId : BidDetails.AuctionId,
            name : req.user.name
        };

        bid = await req.user.createBid(BidRequest);
        const auction = await Auction.findByPk(BidDetails.AuctionId,{
            include : {
                model : Bid,
                required : false,
                where : {
                    userId : {
                        [Sequalize.Op.eq] : req.user.id
                    }
                }
            }
        })
        
        if(!bid){
            res.status(401).json({ error : "Bid Could Not be created"})
            return 
        }
        res.status(200).json(
            {
                message : "Bid Created",
                auction : auction
            }
        );
     }catch(err){
        res.status(401).json({ error : "--Auction Could Not be created" + err.message })
     }
}

exports.getAllAuctions = async (req,res,next) => {
    try{
        
        const auctions = await Auction.findAll({
            where : {
                isSold : false
            }
        });
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
                required : false,
                where : {
                    userId : {
                        [Sequalize.Op.eq] : req.user.id
                    }
                }
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


exports.getAllUserAuctions = async (req,res,next) => {
    try{
        
        const auctions = await req.user.getAuctions()
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

