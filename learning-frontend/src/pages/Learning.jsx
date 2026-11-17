import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Learning.css";


function Learning() {

const { id } = useParams();
const navigate = useNavigate();


const [user,setUser] = useState(null);
const [completed,setCompleted] = useState(false);

const [currentLesson,setCurrentLesson] = useState(0);



const courses = {


1:{
title:"Web Development",
description:"Learn HTML, CSS, JavaScript and React.",
icon:"💻",

lessons:[

{
id:1,
title:"Introduction to Web Development",
description:"Understand websites, frontend and backend development.",

video:
"https://www.youtube.com/embed/UB1O30fR-EE",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/web%20development/01_Web_Development_Introduction.pdf",

content:
"Web development is the process of creating websites and web applications."
},


{
id:2,
title:"HTML, CSS & JavaScript",
description:"Learn the technologies used to build websites.",

video:
"https://www.youtube.com/embed/PkZNo7MFNFg",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/web%20development/02_Web_Development_Core_Concepts.pdf",

content:
"HTML creates structure, CSS styles pages and JavaScript adds interaction."
},


{
id:3,
title:"React & Project Development",
description:"Learn React basics.",

video:
"https://www.youtube.com/embed/SqcY0GlETPk",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/web%20development/03_Web_Development_Practical_Learning.pdf",

content:
"React helps developers build reusable components."
}

]

},



2:{

title:"Python Programming",
description:"Learn Python from basics to advanced concepts.",
icon:"🐍",


lessons:[

{
id:1,
title:"Introduction to Python",

video:
"https://www.youtube.com/embed/rfscVS0vtbw",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/python/01_Python_Introduction.pdf",

content:
"Python is a simple and powerful programming language."
},


{
id:2,
title:"Variables, Conditions & Loops",

video:
"https://www.youtube.com/embed/x7X9w_GIm1s",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/python/02_Python_Core_Concepts.pdf",

content:
"Learn variables, conditions and loops."
},


{
id:3,
title:"Functions & Mini Project",

video:
"https://www.youtube.com/embed/9Os0o3wzS_I",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/python/03_Python_Practical_Learning.pdf",

content:
"Create programs using Python functions."
}

]

},



3:{

title:"AWS cloud",
description:"Learn AWS, cloud computing and deployment.",
icon:"☁️",


lessons:[

{
id:1,
title:"Introduction to AWS",

video:
"https://www.youtube.com/embed/ynPjd9TKLc4",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/AWS cloud/01_AWS_Cloud_Introduction.pdf",

content:
"AWS provides cloud services."
},


{
id:2,
title:"EC2, S3 & RDS",

video:
"https://www.youtube.com/embed/JIbI7P1N3N8",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/AWS cloud/02_AWS_Cloud_Core_Concepts.pdf",

content:
"Learn EC2, S3 and RDS services."
},


{
id:3,
title:"AWS Deployment Project",

video:
"https://www.youtube.com/embed/ynPjd9TKLc4",

pdf:
"https://d10zm41uakty5v.cloudfront.net/courses/AWS cloud/03_AWS_Cloud_Practical_Learning.pdf",

content:
"Deploy applications using AWS."
}

]

}

};


const course = courses[id];

const lesson = course?.lessons[currentLesson];
// LOGIN CHECK

useEffect(() => {

const storedUser = localStorage.getItem("user");


if(!storedUser){

navigate("/login");
return;

}


try{

const loggedUser = JSON.parse(storedUser);

setUser(loggedUser);


}catch(error){

console.error(error);

localStorage.removeItem("user");

navigate("/login");

}


},[navigate]);





// COMPLETE COURSE

const handleCompleteCourse = async()=>{


if(!user){

navigate("/login");
return;

}


try{


const response = await fetch(
"/api/progress",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

user_id:user.id,

course_id:Number(id)

})


}

);



if(!response.ok){

throw new Error("Progress save failed");

}


setCompleted(true);


alert("🎉 Course completed successfully!");



}catch(error){


console.error(
"Progress error:",
error
);


alert(
"Unable to save progress"
);


}


};





// COURSE NOT FOUND


if(!course){


return(

<main className="learning-page">

<div className="learning-error">

<h2>
Course Not Found
</h2>


<button
onClick={()=>navigate("/courses")}
>

Back to Courses

</button>


</div>

</main>


);


}




return (

<main className="learning-page">


{/* HEADER */}


<section className="learning-header">


<div className="learning-course-icon">

{course.icon}

</div>


<p className="learning-label">

LEARNHUB COURSE

</p>



<h1>

{course.title}

</h1>



<p>

{course.description}

</p>


</section>





{/* LESSON LIST */}


<section className="lessons-section">


<div className="lessons-heading">


<div>

<p className="learning-label">

COURSE CONTENT

</p>


<h2>

Lessons

</h2>


</div>


<span>

{course.lessons.length} Lessons

</span>


</div>







{/* LESSON CARD */}


<div className="lesson-card">



<div className="lesson-number">

{currentLesson + 1}

</div>





<div className="lesson-content">


<p className="lesson-label">

LESSON {currentLesson + 1}

</p>




<h3>

{lesson.title}

</h3>



<p>

{lesson.description}

</p>





{/* VIDEO */}



<div className="video-section">


<h3>

🎥 Lesson Video

</h3>


<iframe

src={lesson.video}

title={lesson.title}

allowFullScreen

/>


</div>







{/* CONTENT */}



<div className="lesson-body">


<h3>

📖 Lesson Notes

</h3>


<p>

{lesson.content}

</p>


</div>







{/* PDF */}



<div className="pdf-section">


<h3>

📄 PDF Notes

</h3>



<a

href={lesson.pdf}

target="_blank"

rel="noopener noreferrer"

 className="pdf-btn"
>
    📄 Open PDF Notes
  
</a>



</div>





</div>


</div>








{/* NAVIGATION */}



<div className="lesson-navigation">



<button

className="previous-lesson-btn"

disabled={currentLesson===0}

onClick={()=>setCurrentLesson(currentLesson-1)}

>

← Previous Lesson

</button>






{currentLesson < course.lessons.length-1 ?



<button

className="next-lesson-btn"

onClick={()=>setCurrentLesson(currentLesson+1)}

>

Next Lesson →

</button>



:

<button

className="next-lesson-btn"

onClick={()=>navigate(`/quiz/${id}`)}

>

Take Quiz →

</button>



}



</div>







{/* COMPLETE MESSAGE */}



{

completed &&

<div className="completed-message">


<span>

🎉

</span>


<div>

<h3>

Course Completed!

</h3>


<p>

Your progress saved successfully.

</p>


</div>


</div>


}




</section>







<div className="learning-footer">


<button

className="back-courses-btn"

onClick={()=>navigate("/courses")}

>

← Back to Courses

</button>


</div>





</main>


);


}


export default Learning;