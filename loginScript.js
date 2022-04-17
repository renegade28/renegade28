 //loginfunction
 function onlogin(){
    console.log("function is entering");
     var credentials=readCredentials();
     verifyCredentials(credentials);
 }




//reading credentials

function readCredentials(){
    var credentials={};
    credentials["username"] = document.getElementById("username").value;
    credentials["password"]=document.getElementById("password").value;
    console.log(credentials);
    return credentials;
}


//varifying credentials and naviagting according to it

function verifyCredentials(credentials){

    if(credentials["username"]=="ADMIN"&&credentials["password"]=="1234"){
        //go to admin page
        console.log("Going to admin page");
        location.href="file:///E:/Car%20Parking%20Project/Admin.html"

    }
    else if(credentials["username"]=="GATEMAN"&&credentials["password"]=="1234"){
        //goto Gate man page.
        location.href="Gateman.html"
    }
    else{
    //show pop up message
    console.log("not verifeid");
    alert("Mara kha");
}
}


//sending and getting data of local storage
function sendInfotostorage(slotinfo){
        let dataTobeSaved = [];
        let previousData = getPreviousData();
        if (previousData && previousData.length) {
          previousData.forEach((data) => {
            dataTobeSaved.push(data);
          });
        }
        dataTobeSaved.push(slotinfo);
        console.log(slotinfo);
        localStorage.setItem("slots",JSON.stringify(dataTobeSaved));
        resetForm();
}

function getPreviousData(){
    let slotinfo=localStorage.getItem("slots");
    slotinfo=JSON.parse(slotinfo);
    return slotinfo;
}



// add new slot section


 function onFormSubmit(){
    var slotinfo={};
     console.log("Shakib");
     slotinfo["slotnumber"] = document.getElementById("slotnumber").value;
     slotinfo["rateperhour"] = document.getElementById("rateperhour").value;
     slotinfo["slotstatus"]="1";
     slotinfo["starting"]="0";
     slotinfo["stopping"]="0";
     sendInfotostorage(slotinfo);

}
function resetForm(){
 
}


//Admin page script
function addSlot(){
    console.log("Button have been pressed");
    location.href="Addnewslot.html"
}


//selection
const postsElement=document.querySelector(".posts");
var infos=[];
infos=getPreviousData();

const loadAllData = () =>{
    infos=getPreviousData();
 var hide=document.getElementById("mama");
 
 console.log("eida hide",hide);
 if(hide){
    hide.remove()
 }
debugger
var post2Element=document.createElement("div")
 post2Element.id="postzone"

 let html="";
    infos.forEach((post) => {

        console.log(post);
        const postElement=document.createElement("div");
        postElement.id="mama"
        postElement.classList.add("post");
        html+=`<p id="slotserial" class="post-title">Slot:${post.slotnumber}</p> 
        <p class="Post-body">Rate:${post.rateperhour} tk/h</p>
        <button   onclick="onRemoveSlot(this,${infos.indexOf(post)})">Remove</button>
        <button  onclick="onEditSlot(this)">Edit</button>`
        
    });

/*post2Element.innerHTML=html;*/
post2Element.appendChild(html);

};



var selectedpost;

function onRemoveSlot(pt,index){
    let answer=confirm('Want to remove the slot?');

    if(answer==true){
    selectedpost=pt.parentElement;
    console.log("On remove pressed")
    console.log(index);
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
     dataTobeSaved.push(data);
    });
    var removed=dataTobeSaved.splice(index,1);
    console.log(removed);

    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));
    loadAllData();
}

    }

loadAllData();