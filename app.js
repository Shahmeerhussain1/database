 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

 import { getAuth,
   createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    onAuthStateChanged ,
    sendEmailVerification,
    signOut,
      } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";



  

 const firebaseConfig = {

   apiKey: "AIzaSyDTgpzAlC6sszJY9uSrWOqzewgp86K6GLg",
   authDomain: "data-64504.firebaseapp.com",
   projectId: "data-64504",
   storageBucket: "data-64504.appspot.com",
   messagingSenderId: "870525670816",
   appId: "1:870525670816:web:9eba97f0cd3c6601d380c5"

 };

 import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  query,
  collection,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




 let  up_Email=document.getElementById("Email")
 let up_Password = document.getElementById("Password")
 let sign_up_btn = document.getElementById("sign_up_btn")
 let  National=document.getElementById("National")
 let Number = document.getElementById("Number")
 let age = document.getElementById("age")
 let Name = document.getElementById("Name")
 
 
 
 const auth = getAuth();
 if(sign_up_btn){
  sign_up_btn.addEventListener("click",()=>{

    let z =   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(up_Email.value)
    let f = /^[a-zA-Z ]+$/.test( Name.value);
    let num = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(Number.value)
    var ge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(age.value)
    let country = /^[a-zA-Z ]+$/.test( National.value);
    let pas = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(up_Password.value)


    if(f== true){
      if(num == true){
        if(ge == true){
          if(country == true){
            if(z == true){
              if(pas == true){
                const loader =document.getElementsByClassName("loader")[0];
 loader.classList.toggle("hidden");
              
                createUserWithEmailAndPassword(auth, up_Email.value, up_Password.value)
                .then(async (userCredential) => {
                 let uid = userCredential.user.uid;
                 let firDoc = doc(db, "users", uid);
            
                 const auth = getAuth();

                 sendEmailVerification(auth.currentUser)
                 .then(() => {console.log("email sent" , user);})
                 .catch(() => {
                  console.log("email not sent")});
                
            
               await setDoc(firDoc, {
                   name: Name.value,
                   email: up_Email.value,
                   password: up_Password.value,
                   number: Number.value ,
                   nationality:National.value ,
                   age:age.value
                 })
             if(userCredential.user){
                  console.log(userCredential.user)
                  window.location = "/login/page.html"
                       }
                 console.log(uid)
                 ;
                 
               
                    })
                 .catch((error) => {
                   const errorCode = error.code;
                   const errorMessage = error.message;
                   console.log(errorCode)
               if(errorCode){
                swal(errorCode)
               }
              

            
                   
                 } )
                  
                     
                 ;
                 
            
            }else{
              up_Password.style.borderBottomColor = "red"
              let sub4 = document.getElementById("opir")
              sub4.style.display = "block"
              sub4.style.transition="all 2s"
              
             
            }
          }else{up_Email.style.borderBottomColor = "red";
          up_Email.style.transition="all 2s"}

        }else{National.style.borderBottomColor = "red"}

      }else{age.style.borderBottomColor = "red"}
    }else{Number.style.borderBottomColor = "red"}
  }else{Name.style.borderBottomColor = "red"}
})}

 
    







 let sign_in_btn = document.getElementById("sign_in_btn")
 if(sign_in_btn){
  sign_in_btn.addEventListener("click",()=>{
    const loader =document.getElementsByClassName("loader")[0];
    loader.classList.toggle("hidden");
 let sinn_in_Email= document.getElementById("sinn_in_Email")
 let sinn_in_Password= document.getElementById("sinn_in_Password")

 const auth = getAuth();

    signInWithEmailAndPassword(auth, sinn_in_Email.value, sinn_in_Password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.auth.currentUser,"You are logged inn")
      if(user){
        window.location = "/login/page.html"
      
      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      swal(errorMessage.replace("Firebase: Error (auth/",""))
    });
  })}








  //chking user
window.onload =()=>{
  // event.preventDefault()
    onAuthStateChanged(auth,async(user) => {
      // console.log(user)
 

const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  

let dta =  docSnap.data()
  let o = document.getElementById("o")
  o.innerHTML += `
  <table>
  <tr>
  <th class="pup">Name: </th><td class="pup">${dta.name}<td>
  </tr>
  <tr>
  <th class="pup">Email: </th><td class="pup">${dta.email}<td>
  </tr>
  <tr>
  <th class="pup">Nationality: </th><td class="pup">  ${dta.nationality}<td>
  </tr>
  <tr>
  <th class="pup">Age: </th><td class="pup">${dta.age}<td>
  </tr>
  <tr>
  <th class="pup">Phone: </th><td class="pup">${dta.number}<td>
  </tr>
  </table>
  `




  // import { collection, getDocs } from "firebase/firestore";

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, )//" => ", doc.data());
    let  docsss =  doc.data()
    console.log(docsss)
     if( doc.id){
    let oi = document.getElementById("oi")
    console.log(oi)
    oi.innerHTML += `
    <table>
  
    <tr ><td class="pup">${docsss.name}</td></tr>
    </table
    `
  }
  });
 


// const q = query(collection(db, "user"), where(user.uid, "==", true));
//   console.log("Document data:" , user.uid);

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   if(doc.id){
//   console.log(doc.id, " => ", doc.data());}
//   else{
//     console.log("not foundd")

//   }
// });

  // console.log("Document data:" , dta);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}


    if (!user) {
      const uid = user.Name;
      const uid2 = user.email;
      console.log( user )
      console.log(uid2)
      window.location = ("/index.html")
    } 
     
    
  });
}




//signout
var signout = document.getElementById("signout")
if(signout){
signout.addEventListener("click",()=>{
  const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  window.location = "/index.html"
  console.log("Successfull")
}).catch((error) => {
  // An error happened.
});
})} 















// window.onload = async ()=>{
  // console.log(auth)
  // const docRef = doc(db, 'user', );
  // const docSnap = await getDoc(docRef);
  
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
    // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

// }












// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyDF0aUfBCSwy9IDXHxqQWpI8tzwIAuoj5Y",
//     authDomain: "learning-6aaa4.firebaseapp.com",
//     projectId: "learning-6aaa4",
//     storageBucket: "learning-6aaa4.appspot.com",
//     messagingSenderId: "202086806761",
//     appId: "1:202086806761:web:0544a889578ba4f8922c78"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
