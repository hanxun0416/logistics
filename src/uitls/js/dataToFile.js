 function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}
// function downloadFile(url,name='What\'s the fuvk'){
//       //var img =  document.createElement("img")
//       //img.setAttribute("src",url)
//       var img ='<img src="'+url+'" />';
//      // img.src=url;

//     var real=document.getElementById("real")
//     real.innerHTML=img
//   //  real.appendChild(img)
//   //     var a = document.createElement("a")
//   //     a.setAttribute("href",url)
//   //     a.setAttribute("download",name)
//   //     a.setAttribute("target","_blank")
//   //     let clickEvent = document.createEvent("MouseEvents");
//   //     clickEvent.initEvent("click", true, true);  
//   //     a.dispatchEvent(clickEvent);
//   }
export  function downloadFileByBase64(base64,name){
    var myBlob = dataURLtoFile(base64,name)
    var myUrl = URL.createObjectURL(myBlob)
    // downloadFile(myUrl,name)
    let obj = {
      url:myUrl,
      flag:true
    }
    return   obj
}