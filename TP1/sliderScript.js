let listOfImages=[];
listOfImages.push({
	Image: "images/paisagem.jpg",
		Description: "Japan has greatviews"});
listOfImages.push({
	Image: "images/imagem.jpg",
		Description: "Japan still has ancient traditional villages in the midlle of nature"})
listOfImages.push({
	Image: "images/cidade_e_montanha.jpg",
		Description: "Japan has a nice contrast between cities and nature"})
listOfImages.push({
	Image: "images/noite.jpg",
		Description: "Japan has lighted and animated streets during the night time"})
listOfImages.push({
	Image: "images/templo_na_natureza.jpg",
		Description: "Japan has multiple temples blended with nature"})


function getNextImage(){
	let a = 0;
	let curr=document.getElementById("currvalue").value;
	//console.log(curr);

	for (var i = 0; i < listOfImages.length; i++) {
		//console.log(listOfImages[i]);
		if(listOfImages[i].Image==curr){
			a=i+1;
		}
	}
	//console.log(a)
	if(a<i)
		return listOfImages[a];
	else return listOfImages[0];
}

function getPreviousImage(){
	let a = 0;
	let curr=document.getElementById("currvalue").value;
	//console.log(curr);

	for (var i = 0; i < listOfImages.length; i++) {
		//console.log(listOfImages[i]);
		if(listOfImages[i].Image==curr){
			a=i-1;
		}
	}
	//console.log(a)
	if(a>=0)
		return listOfImages[a];
	else return listOfImages[listOfImages.length-1];
}

function showImage(img) {
	let newimage=getNextImage();
	console.log(img);
	document.getElementById("currvalue").value=img.Image;
	document.getElementById("slide").src=img.Image;
	document.getElementById("description").innerHTML=img.Description;
}

showImage(listOfImages[0])