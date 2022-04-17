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
    localStorage.setItem("slots",JSON.stringify(dataTobeSaved));
    resetForm();
}

function getPreviousData(){
let slotinfo=localStorage.getItem("slots");
slotinfo=JSON.parse(slotinfo);
return slotinfo;
}

// add new slot section


function onAddSubmit(){
 var slotinfo;
 slotinfo["slotnumber"]=document.getElementById("slotnumber").value;
 slotinfo["rateperhour"]=document.getElementById("rateperhour").value;
 sendInfotostorage(slotinfo);

}