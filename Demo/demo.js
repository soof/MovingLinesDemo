	var lines =[], allLines=[], frameRate = 25;
	
	
	function init(){
//z		document.getElementById('replay').addEventListener('click', function(){replay()}, false);
		startTransitions();
		positionLines();
	//	positionLinesFixed();
		moveLines();
	}
	
	function startTransitions() {
		document.getElementById('sandwich').className = 'moveRight';
	}
	function replay(){
	//	document.getElementById("sandwich").className = document.getElementById("sandwich").className.replace(/\bmoveRight\b/,'')
		document.getElementById("sandwich").className = '';
		setTimeout(function(){startTransitions()}, 2000);  //needed to wait before transitioning back in, otherwise transition happens "IN AN INSTANT" which means nothing visible happens!
	}
	
	function positionLines(){   //assign random startpoint, endpoint and duration
		allLines = getElementsByClassName('line');
		for (var i=0, j=allLines.length; i<j; i++){
			lines[i] = [];
			lines[i]['div'] = allLines[i];
			lines[i]['startpoint'] = Math.ceil(Math.random()*1000) +'px';  //random # between 1 & 1000
//			lines[i]['endpoint'] = (Math.floor((1000-299)*Math.random()) + 300) + 'px';  //random # between 300 & 1000
			lines[i]['endpoint'] = (Math.ceil(Math.random()*1000))+ 'px';  //random # between 1 & 1000
			lines[i]['duration'] = (Math.floor((5000-999)*Math.random()) + 900) ;  //random # between 900 & 5000
			lines[i]['timer'] = 0;
			allLines[i].style.left = lines[i]['startpoint'];
		}
	}
	
	function positionLinesFixed(){  // predefined startpoint, endpoint and duration
		allLines = getElementsByClassName('line');
			lines[0] = [];
			lines[0]['div'] = allLines[0];
			lines[0]['startpoint'] = '400px';
			lines[0]['endpoint'] = '800px'
			lines[0]['duration'] =  3000;
			lines[0]['timer'] = 0;
			allLines[0].style.left = lines[0]['startpoint'];
			lines[1] = [];
			lines[1]['div'] = allLines[1];
			lines[1]['startpoint'] = '600px'
			lines[1]['endpoint'] = '800px'
			lines[1]['duration'] =  4000;
			lines[1]['timer'] = 0;
			allLines[1].style.left = lines[1]['startpoint'];
			lines[2] = [];
			lines[2]['div'] = allLines[2];
			lines[2]['startpoint'] = '600px'
			lines[2]['endpoint'] = '100px'
			lines[2]['duration'] =  1500;
			lines[2]['timer'] = 0;
			allLines[2].style.left = lines[2]['startpoint'];
			lines[3] = [];
			lines[3]['div'] = allLines[3];
			lines[3]['startpoint'] = '400px';
			lines[3]['endpoint'] = '950px'
			lines[3]['duration'] =  2500;
			lines[3]['timer'] = 0;
			allLines[3].style.left = lines[3]['startpoint'];
			lines[4] = [];
			lines[4]['div'] = allLines[4];
			lines[4]['startpoint'] = '300px';
			lines[4]['endpoint'] = '800px'
			lines[4]['duration'] =  5000;
			lines[4]['timer'] = 0;
			allLines[4].style.left = lines[4]['startpoint'];
			lines[5] = [];
			lines[5]['div'] = allLines[5];
			lines[5]['startpoint'] = '700px';
			lines[5]['endpoint'] = '350px'
			lines[5]['duration'] =  3000;
			lines[5]['timer'] = 0;
			allLines[5].style.left = lines[5]['startpoint'];
			lines[6] = [];
			lines[6]['div'] = allLines[6];
			lines[6]['startpoint'] = '550px';
			lines[6]['endpoint'] = '50px'
			lines[6]['duration'] =  2000;
			lines[6]['timer'] = 0;
			allLines[6].style.left = lines[6]['startpoint'];
	}
	
	function moveLines(){
		for (var i=0, j=lines.length; i<j; i++){
			numFrames = lines[i]['duration']/1000 * frameRate;
			pxDistance = Math.abs(parseInt(lines[i]['startpoint']) - parseInt(lines[i]['endpoint']));
			pxPerFrame = Math.ceil(pxDistance/numFrames);
			lines[i]['pxPerFrame'] = pxPerFrame;
			lines[i]['direction'] = (parseInt(lines[i]['startpoint']) > parseInt(lines[i]['endpoint'])) ? 'left' : 'right';
			moveLine(i);
		}
	}
	
	function moveLine(i){
		if ((lines[i]['direction'] == 'left') &&  ( parseInt(getStyle(allLines[i], 'left')) > parseInt(lines[i]['endpoint']))){
			allLines[i].style.left =  (parseInt(getStyle(allLines[i], 'left')) - lines[i]['pxPerFrame']) + 'px';
			lines[i]['timer'] = setTimeout(function(){moveLine(i)}, 40);
		}else{
			if ((lines[i]['direction'] == 'right') && ( parseInt(getStyle(allLines[i], 'left')) < parseInt(lines[i]['endpoint']))){
			allLines[i].style.left = (parseInt(allLines[i].style.left) + lines[i]['pxPerFrame']) + 'px';
			lines[i]['timer'] = setTimeout(function(){moveLine(i)}, 40);
			}else{
				if ((lines[i]['direction'] == 'right') &&  parseInt(allLines[i].style.left) > parseInt(lines[i]['endpoint'])){
					lines[i]['direction'] = 'left';
				}
				if ((lines[i]['direction'] == 'left') &&  parseInt(allLines[i].style.left) < parseInt(lines[i]['endpoint'])){
					lines[i]['direction'] = 'right';
				}
				startpoint = lines[i]['startpoint'];
				lines[i]['startpoint'] = lines[i]['endpoint'];
				lines[i]['endpoint'] = startpoint;
				moveLine(i);
				}
			}
	}


function cleanUp(){
	lines = null;
	allLines = null;
}

function getElementsByClassName(className)
{	// get all elements in the document
	if (document.all){
		var allElements = document.all;
	}
	else{
		var allElements = document.getElementsByTagName("*");
	}
	
	var foundElements = [];
	for (var i = 0, ii = allElements.length; i < ii; i++){
		var classArray = allElements[i].className.split(' ');
		for (var j=0, jj = classArray.length; j < jj; j++){
			if (classArray[j] == className){
				foundElements[foundElements.length] = allElements[i];
			}
		}
	}
	return foundElements;
} 

function getStyle(el, cssprop){
 if (el.currentStyle) //IE
  return el.currentStyle[cssprop]
 else if (document.defaultView && document.defaultView.getComputedStyle) //Firefox
  return document.defaultView.getComputedStyle(el, "")[cssprop]
 else //try and get inline style
  return el.style[cssprop]
}


window.addEventListener('load', function(){init()}, false);
window.addEventListener('unload', function(){cleanUp()}, false);
