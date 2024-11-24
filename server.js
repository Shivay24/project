var express=require("express");
var app=express();
var fileuploader=require("express-fileupload");
app.use(fileuploader());
var mysql2=require("mysql2");
var cloudinary=require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'did6ene8y', 
    api_key: '811781566798319', 
    api_secret: 's1Y51fwDc1JAy_Km9ytLPGf__Ow' 
});
app.listen(805,function(){
    console.log("server started");
})
app.get("/hello",function(req,resp){
    resp.send("hello users");
})
app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})
app.get("/awsh",function(req,resp){
    let path=__dirname+"/public/dashp.html";
    resp.sendFile(path);
})
let config="mysql://avnadmin:AVNS_qIDYZtQaSaRx7eC6-Qh@mysql-14aeef26-anshugarg964-a0c4.k.aivencloud.com:14737/defaultdb"
let sj=mysql2.createConnection(config);
sj.connect(function(err)
{
    if(err==null)
        console.log("Connected sir");
    else
    console.log(err.message);
})
app.use(express.static("public"));
app.get("/signup",function(req,resp){
    let email=req.query.txtEmail;
    let pwd=req.query.txtPwd;
    let utype=req.query.utype;

    sj.query("insert into users(email,pwd,utype,status,dos) values(?,?,?,?,current_date())",[email,pwd,utype,1],function(err){
        if(err==null)
        {
           
         resp.send("welcome sir");

        }
        else
            resp.send(err.message)
    })

})
app.get("/login",function(req,resp){
    let email=req.query.txtEmaillog;
    let pwd=req.query.txtPwdlog;
    sj.query("select * from users where email=? and pwd=?",[email,pwd],function(err,jsonArray){
        // resp.send(jsonArray)
        console.log(jsonArray);
        if(jsonArray.length==1)
        {
            resp.send(jsonArray[0]["utype"]);
            console.log(jsonArray[0]["status"]);
        }
        else
            resp.send("invalid");
    })
    
})
app.get("/chk-user",function(req,resp){
    let email=req.query.txtEmail;
    sj.query("select * from users where email=?",[email],function(err,jsonArray){
        if(jsonArray.length==1)
            resp.send("Already taken");
        else
            resp.send("Ok");
    })
})
app.get("/ansh",function(req,resp){
    let patcher=__dirname+"/public/dasho.html";
    resp.sendFile(patcher);
})
app.get("/aksh",function(req,resp){
    let arn=__dirname+"/public/profile2.html";
    resp.sendFile(arn);
})
app.get("/arsh",function(req,resp){
    let arni=__dirname+"/public/profile3.html";
    resp.sendFile(arni);
})

    app.use(express.urlencoded(true)); 
app.post("/save", async function(req,resp){
    console.log(req.body);
    let filename="";
    if(req.files==null)
    {
        filename="nopic.jpg";
    }
    else
    {
        filename=req.files.txtprooffile.name;
        let path=__dirname+"/public/images/"+filename;
        console.log(path);
        req.files.txtprooffile.mv(path);
    
     await cloudinary.uploader.upload(path).then(function(result){
        filename=result.url;
        console.log(filename);
     });
    }
       req.body.txtprooffile=filename; 
       sj.query("insert into organizations values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtemail,req.body.txtorg,req.body.txtcontact,req.body.txtaddress,req.body.txtcity,req.body.txtprooffile,req.body.txtproof,req.body.txtsports,req.body.txtprev,req.body.txtwebsite,req.body.txtinsta],function(err){
        if(err==null)
            resp.send("RECORD SENT SUCCESSFULLY....");
        else
        {resp.send(err.message);
            console.log(err.message)
        }
       })
    
})
app.post("/update",async function(req,resp)
{
    let filename="";
    if(req.files==null)
    {
        filename="nopic.jpg";
    }
    else
    {
        filename=req.files.prooffile;
        let path=__dirname+"/public/images/"+filename;
        console.log(path);
        req.files.txtprooffile.mv(path);

        await cloudinary.uploader.upload(path).then(function(result){
            filename=result.url;
            console.log(filename);
        });
        
    }
    req.body.prooffile=filename;

    // update data
    sj.query("update organizations set organisation=?,contact=?,address=?,city=?,prooffile=?,proof=?,sport=?,preview=?,website=?,insta=? where email=?",[req.body.txtorg,req.body.txtcontact,req.body.txtaddress,req.body.txtcity,req.body.txtprooffile,req.body.txtproof,req.body.txtsports,req.body.txtprev,req.body.txtwebsite,req.body.txtinsta,req.body.txtemail],function(err)
{
    if(err==null)
        resp.send("record updated successfully");
    else
    resp.send(err.message);
})
})
app.get("/fetch-user",function(req,resp)
{
    let email=req.query.txtMail;
    mysqlServer.query("select * from organizations where email=?",[req.body.txtemail],function(err,jsonArray)
    {
        //possibility : 0 or 1 records
        //resp.send(jsonArray);
        if(err!=null)
        {
            resp.send(err.message);
        }
        else
       
                resp.send(jsonArray);
           
    })

})
app.post("/save-tournament", async function(req,resp){
    console.log(req.body);
    let filename="";
    if(req.files==null)
    {
        filename="nopic.jpg";
    }
    else
    {
        filename=req.files.txtposter;
        let path=__dirname+"/public/images/"+filename;
        console.log(path);
        req.files.txtposter.mv(path);
    
     await cloudinary.uploader.upload(path).then(function(result){
        filename=result.url;
        console.log(filename);
     });
    }
       req.body.txtposter=filename; 
       sj.query("insert into tournament values(?,?,?,?,?,?,?,?,?,?,?)",[null,req.body.txtemail,req.body.txtgame,req.body.txttitle,req.body.txtfee,req.body.txtdate,req.body.txtcity,req.body.txtlocation,req.body.txtprize,req.body.txtposter,req.body.txtinfo],function(err){
        if(err==null)
            resp.send("RECORD SENT SUCCESSFULLY....");
        else
        {resp.send(err.message);
            console.log(err.message)
        }
       })
    
})
app.get("/angular",function(req,resp)
{
    //resp.send("<b><u>Its Home Page</b>");
    let path=__dirname+"/public/tournaments.html";
    resp.sendFile(path);

})

app.get("/fetch-all-users",function(req,resp)
{
    
    sj.query("select * from tournament",function(err,jsonArray)
    {
        
        if(err!=null)
        {
            resp.send(err.message);
        }
        else
       
                resp.send(jsonArray);
           
    })

})
app.get("/fetch-cities",function(req,resp)
{
    sj.query("select distinct city from tournament",function(err,jsonArray)
{
    if(err!=null)
    {
        resp.send(err.message)
    }
    else
    resp.send(jsonArray)
})
})
app.get("/fetch-games",function(req,resp)
{
    sj.query("select distinct game from tournament",function(err,jsonArray)
{
    if(err!=null)
    {
        resp.send(err.message)
    }
    else
    resp.send(jsonArray)
})
})
app.get("/fetch-records",function(req,resp)
{
    city=req.query.city;
    game=req.query.game;

    sj.query("select * from tournament where city=? and game=?",[city,game],function(err,jsonArray)
{
    if(err!=null)
    {
        resp.send(err.message)
    }
    else
    resp.send(jsonArray)
})
})
app.get("/post-tournament",function(req,resp)
{
    //resp.send("<b><u>Its Home Page</b>");
    let path=__dirname+"/public/profile2.html";
    resp.sendFile(path);

})
app.post("/save-player", async function(req,resp){
    console.log(req.body);
    let filename="";
    if(req.files==null)
    {
        filename="nopic.jpg";
    }
    else
    {
        filename=req.files.txtproof;
        let path=__dirname+"/public/images/"+filename;
        console.log(path);
        req.files.txtproof.mv(path);
    
     await cloudinary.uploader.upload(path).then(function(result){
        filename=result.url;
        console.log(filename);
     });
    }
       req.body.txtproof=filename; 
       sj.query("insert into player values(?,?,?,?,?,?,?,?,?,?)",[req.body.txtemail,req.body.txtname,req.body.txtgame,req.body.txtmob,req.body.txtdob,req.body.txtgender,req.body.txtadd,req.body.txtcity,req.body.txtproof,req.body.txtinfo],function(err){
        if(err==null)
            resp.send("Record has been sent");
        else
        {resp.send(err.message);
            console.log(err.message)
        }
       })
    
})
app.get("/update-Password",function(req,resp){
    let email=req.query.email;
    let CurrPwd=req.query.CurrPwd;
    let NewPwd=req.query.NewPwd;
    sj.query("update users set pwd=? where email=? and pwd=?",[NewPwd,email,CurrPwd],function(err,result){
        if(err!=null){
            resp.send(err.message);
        }
        else if(result.affectedRows==1){
            resp.send("Updated successfully")
        }
        else{
            resp.send("invalid Current Password")
        }
    });
});