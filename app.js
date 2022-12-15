 
 const express = require('express');
 const Joi =require("joi");
 const app = express();
 var bodyParser = require('body-parser')
  
 // create application/json parser
 var jsonParser = bodyParser.json()

 app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

 const courses =[{id:1,name:"English"},{id:2,name:"Urdu"},{id:3,name:"Chemistry"}]
 
 app.get('/',(req,res) => {
    res.send(courses);
 });

 app.get('/api/courses',(req,res,) => {
    res.send(courses);
    
 });

//  app.get('/api/courses/post/:year/:months',(req,res) => {
//     res.send(req?.params);
    
//  });

//  get Course byId
app.get("/api/courses/:id",(req,res)=>{
      const course = courses.find(item=>item.id==parseInt(req.params.id));
      if(!course) res.status(404).send("The given data not found");
      res.send(course);

});

//  add a course

app.post("/api/courses",(req,res)=>{
  
    const course ={
      id: courses.length + 1,
      name: req.body.name,
    }
   courses.push(course);
   res.send(req.body.name);
   

   // const schema  ={
   //    name: Joi.string().min(3).required()
   // };
   // const result =Joi.valid(req.body,schema)
   // if(result){
   //    res.status(400).send(error)
   // }
   // else{
   //    const  course ={
   //       id:courses.length + 1,
   //       name:req.body.name
   //    }
   //    const allCourses = courses.push(course);
   //    res.send(allCourses);
   // }
  

})

app.put("/api/courses/:id", (req, res) => {
  // validate the request

//   const schema = {
//     name: Joi.string().min(3).required(),
//   };

//   const { error } = Joi.valid(req.body, schema);
//   console.log(error,"error")
//   if (error) res.status(400).send(error);

  // check either result found or not

  const course = courses.find(e => e.id === parseInt(req.params.id));
  if (!course) res.status(404).send("No data found");
  course.name = req.body.name;
  console.log("sss",req.body.name)
  res.send(course);

});

app.patch("/api/courses/:id", (req, res) => {
   // validate the request
 
 //   const schema = {
 //     name: Joi.string().min(3).required(),
 //   };
 
 //   const { error } = Joi.valid(req.body, schema);
 //   console.log(error,"error")
 //   if (error) res.status(400).send(error);
 
   // check either result found or not
 
   const course = courses.find(e => e.id === parseInt(req.params.id));
   if (!course) res.send(404).send("No data found");
   course.name = req.body.name;
   console.log("sss",req.body.name)
   res.send(course);
 
 });
   
  
app.delete("/api/courses/:id",(req,res)=>{
   const course = courses.find(e=>e.id == parseInt(req.params.id))
   if(!course) return res.status(400).send("the data with the given id not found")
   const index = courses.indexOf(course)
   const deletedCourse = courses.splice(index,1)
   res.send(deletedCourse);
})


 app.listen(3000,()=>{console.log("server running at port 3000")})