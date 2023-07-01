const authorize=(req,res,next)=>{
    console.log('authorize');
    const query=req.query;

    if(query.user==='john'){
        req.user={name:'name',id:3}
        next();
    }else{
        res.status(401).send("Unauthorized")
        next();
    }
}

module.exports=authorize;