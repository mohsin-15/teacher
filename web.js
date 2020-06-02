var flash=require("simple-flash"); 
const bodyParser=require("body-parser");
const express=require("express");
const https=require("https");
const app=express();




app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended:true}));

app.use(flash());

app.get("/",function (req, res) {
    res.sendFile(__dirname+"/index.html");
})

app.get("/TEACHERsignup.html",function (req, res) {
    res.sendFile(__dirname+"/TEACHERsignup.html");
})

app.post("/",function (request,respond) {
//   var tname=request.body.username1; 
//   var tpass=request.body.password1;
//   var uname=request.body.username2;
//   var upass=request.body.password2;
})
app.post("/TEACHERsignup.html",function (req, res) {
                var fname=req.body.firstname;
                var lname=req.body.lastname;
                var add=req.body.address;
                var phoneno =req.body.phonenumber;
                var dateofbirth=req.body.dob;
                var emailAddress=req.body.emailid;
                var password=req.body.password;
               
  console.log(emailAddress);
  var dataJSON={
    members: [
        {
            email_address:emailAddress,
            status:"subscribed",
            merge_fields: {
                FNAME:fname,
                LNAME:lname,
                PHONE:phoneno,
                BIRTHDAY:dateofbirth,
                PASSWORD:password,
                ADDRESS:add,
            }
            
        }
    ]
  }   

var dataStringify=JSON.stringify(dataJSON);
console.log(dataStringify);
const url="https://us18.api.mailchimp.com/3.0/lists/49ee85d817"
const option={
        method:"POST",
        auth:"mohsin:ade4ad4ed61a7dec8abe1ac3a448886b-us18",
    }

const request0= https.request(url,option,function (response) {

    response.on("data",function(datao) {
        var jj=JSON.parse(datao);
        console.log(jj);
    })
    console.log(response.statusCode);
    if(response.statusCode===200){ 
        // req.flash("sucess","SUCESSFULLY LOGGED IN");
       res.redirect("/");   
         
    }else{
        // req.flash("error","error, try again");
        res.sendFile("/TEACHERsignup.html");
    }
});

request0.write(dataStringify);
request0.end();
});




app.listen( process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})



// ade4ad4ed61a7dec8abe1ac3a448886b-us18
// 24597f9bb778463aa308af22a1cba1f9-us18
//49ee85d817