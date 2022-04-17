function getPreviousData(){
    let slotinfo=localStorage.getItem("slots");
    slotinfo=JSON.parse(slotinfo);
    return slotinfo;
}

const postsElement=document.querySelector(".posts");
var infos={};
infos=getPreviousData();

const loadAllData = () =>{

    infos.forEach((post) => {
        
        console.log(post);
        const postElement=document.createElement("div");
        postElement.classList.add("post");
         if(post.slotstatus=="1"){
        postElement.innerHTML=`<p id="slotserial" class="post-title">Slot:${post.slotnumber}</p> 
        <p class="Post-body">Rate:${post.rateperhour} tk/h</p>
        <p class="status">Available</p>
        <button   onclick="onStartRenting(this,${post.rateperhour},${post.slotnumber})">Start Renting</button>`
         }
         else{
            postElement.innerHTML=`<p id="slotserial" class="post-title">Slot:${post.slotnumber}</p> 
            <p class="Post-body">Rate:${post.rateperhour} tk/h</p>
            <p>Starting time:${post.starting}</p>
            <p class="booked">Booked</p>
            <button   onclick="onStopRenting(this,${post.rateperhour},${post.slotnumber},${post.starting})">Stop renting</button>`
         }

        postsElement.appendChild(postElement);
        
    });
};
var selectedpost;
const d = new Date();
function onStartRenting(pt,rateperhour,slotnumber){

    let answer=confirm('Are you sure?');
    if(answer==true){
    selectedpost=pt.parentElement;
    console.log(rateperhour);
    var h=d.getHours();
    var m=d.getMinutes();
    console.log(h*24+m);

    
    changeStatus(slotnumber,h*24+m);
    }
    
}



function onStopRenting(pt,rateperhour,slotnumber,starting){

    let answer=confirm('Are you sure?');
    
    if(answer==true){
    var h=d.getHours();
    var m=d.getMinutes();
    var stopping=(h*24+m);
    var timespan=Math.abs(stopping- starting);
    var cost=(timespan/60)*rateperhour;
    console.log(cost);
    alert("Total Cost:"+cost);
     
    resetSlot(slotnumber);
    }

}

/*function changeHtmlView(selectedpost){
   var parser=new DOMParser();
   var htmlstring=JSON.stringify(selectedpost);
   //console.log(typeof htmlstring);
   var htmlDoc=parser.parseFromString(htmlstring,"text/html");
   console.log(htmlDoc.getElementById("slotserial"));
   //console.log(typeof htmlDoc);
    htmlDoc.innerHTML=`<h4 id="slotserial" class="post-title">${post.slotnumber}</h4> 
    <p class="Post-body">${post.rateperhour}</p>
    <p>starting Time: +${post.starting}</p>
    <button   onclick="onStopRenting(this,${post.rateperhour},${post.slotnumber},${post.starting})">Stop renting</button>
    <button  onclick="onEditSlot(this)"></button>`
}*/


function resetSlot(slotnumber){
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
        if(data.slotnumber==slotnumber){
            data.slotstatus="1";
            data.starting="0";
            data.stopping="0"
        }
        dataTobeSaved.push(data);
    });
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));

}




function changeStatus(slotnumber,starting){
    let dataTobeSaved=[];
    let previousData=getPreviousData();
    previousData.forEach((data)=>{
        if(data.slotnumber==slotnumber){
            data.slotstatus="0";
            data.starting=starting;
        }
        dataTobeSaved.push(data);
    });
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));

}

loadAllData();