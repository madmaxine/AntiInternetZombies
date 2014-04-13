
function optionSelect(specificWebsiteCheck,timeWebsiteCheck,groupWebsiteCheck){/*
	if (specificWebsiteCheck==true)
		chcekSpecificWebsite(specificUrl,timeOrGroup);
	if (timeWebsiteCheck==true)
		checkTimeWebsite(amtTime,samePageVisitedNum,samePageVisitedTimeInt);
	if (groupWebsiteCheck==true)
		checkGroupWebsite(numSites,sameGroupOfPagesNum,sameGroupOfPagesLimit);*/
}		
		

	function saveHistory(Urls){

	// var dataObj = {};

//chrome.storage.local.set(dataObj);
				// document.write("yi");

	// chrome.storage.local.get(dataObj, function(result)
	// {
		
		// if (Object.keys(result).length==null){
							// document.write(Object.keys(data).length+"ADSFSA");

			// result=Urls;
				// chrome.storage.local.set(result);
					// chrome.storage.local.get(result, function callback(result){
					
						// for (var i=0;i<result.length;++result){
						// document.write(result[i].url);
						// }
					
					// })
				
			// }else{
					// for (var i=0;i<result.length;++result){
						// document.write(result[i].url);
						// }
				//here you take current history, mesh it with previously measured history w/o duplicates, and shorten it to length of 1000 (maybe, figure out size later)
				   // for (var i=0;i<Urls.length;++i) {
					//	if (items
					// }
			// }
	
	// });

	// chrome.storage.local.get(dataObj[items], function callback(items){
			// document.write("ye");
			// document.write(items[items]);
// /*								document.write("ye");

			// if (items==null){
			// items=Urls;
				// chrome.storage.local.set(items);
					// chrome.storage.local.get(items, function callback(items){
					
						// for (var i=0;i<items.length;++items){
						// document.write(items.url);
						// }
					
					// })
				
			// }else{
			//	here you take current history, mesh it with previously measured history w/o duplicates, and shorten it to length of 1000 (maybe, figure out size later)
				   // for (var i=0;i<Urls.length;++i) {
				//		if (items
					// }
			// }
	// */
		// })
	}

//function getHistory(amtTime, numSites, samePageVistitedUrl, samePageVisitedNum, samePageVisitedTimeInt, sameGroupOfPagesNum, sameGroupOfPagesLimit) {
function getHistory(amtTime,samePageNum,maxTimesVisited) {
console.log(amtTime+" "+samePageNum+" "+maxTimesVisited);
//finding the amount of time that we should look back into the history based on the entered input by user
//default amtTime = 10 minutes

  var numSeconds = 1000 * 60 * amtTime;
  var timeLimit = (new Date).getTime() - numSeconds;

  // Track the number of callbacks from chrome.history.getVisits()
  // that we expect to get.  When it reaches zero, we have all results.
  //var numRequestsOutstanding = 0;
//document.write(timeLimit);

chrome.history.search({'text': '', 'startTime': timeLimit},
	
	 function(historyItems) {


          // We need the url of the visited item to process the visit.
          // Use a closure to bind the  url into the callback's args.

           var urldata=historyList(historyItems);
		   var topSiteList=urldata[0];
		   var domainList=urldata[1];
          		  	 				   //document.write(domainList[5]);
        for (var i=0;i<topSiteList.length;++i) {
		//	document.write("\n"+topSiteList[i]);
		}
        for (var i=0;i<topSiteList.length;++i) {
		//	document.write("\n"+domainList[i]);
		}		
		}
	) 
	
	function historyList(Urls){
		var siteCount=0;
		var nameCheck={};
		var domainList={};
		var topSiteList=new Array();
		var topSiteHits=new Array();
			var counter=parseInt(0);

        for (var i=0;i<Urls.length;++i) {

			var urlName=Urls[i].url;
			var domain = urlName.replace('http://','').replace('https://','').replace("www.","").replace(".com","").replace(".org","").replace(".net","").split(/[/?#]/)[0].toLowerCase();
			domain=domain.toString();
			var notChecked=true;
			for (var j=0;j<topSiteList.length;j++){

 				if (topSiteList[j]==domain){
					topSiteHits[j]++;
					console.log(topSiteList[j]);
					notChecked=false;
					break;
				} 
			
			} 

			if (notChecked==true){
			if (siteCount==0){
				topSiteList[siteCount]=domain;
				topSiteHits[siteCount]=1;
				siteCount++;
			}else if (siteCount<samePageNum){

				var dupSite=false;
				for (var j=0;j<topSiteList.length;j++){
					if (topSiteList[j]==domain){


						dupSite=true;
						break;
					}	 
					if (dupSite==false){
						topSiteList[siteCount]=domain;
						topSiteHits[siteCount]=1;
						siteCount++;
					}
				}

			}

			}
			
			
		
			/* var urlName=Urls[i].url;
			var domain = urlName.replace('http://','').replace('https://','').replace("www.","").replace(".com","").replace(".org","").replace(".net","").split(/[/?#]/)[0].toLowerCase();
			domain=domain.toString();
			var temp;
			if (domainList[domain]===undefined){
				temp=1;
				}
			else{ 
				temp=parseInt(domainList[domain]);
				temp=(temp.value+1);
			}
			
							domainList[domain]=temp.value;


						document.write("\n"+(temp+1));

			
			if(siteCount<samePageNum){
				if (siteCount==0){
					topSiteList[siteCount]=domain;
					siteCount++;
				}else{
					var newSite=true;
					for (var j=0;j<topSiteList.length;j++){
						if(topSiteList[j]==domain){
							newSite=false;
						}
					}
					if(newSite==true){
						topSiteList[siteCount]=domain;
						// document.write(topSiteList[siteCount]);
						siteCount++;
					}
				}
			}

			if (domainList[domain]=null)
				domainList[domain]=domain;
			else domainList[domain]++; */
		}
		var finalListCount=new Array();
		var totalSites=0;
        for (var i=0;i<topSiteList.length-1;++i) {
			totalSites+=topSiteHits[i];
		}
		saveHistory(Urls);
		
			//document.write(totalSites);
		if (totalSites>=maxTimesVisited){
			
			//chrome.alarms.create("you're visisting a lot of the same sites!");
			window.alert("you're visiting a lot of the same sites!");
		}
			 var delay=1000*60/2;//1 seconds
			 console.log(totalSites);
				setTimeout(function(){
				getHistory(amtTime,samePageNum,maxTimesVisited);
				//your code to be executed after 1 seconds
    },delay); 

			
			
			
	} 
	}
/* function checkForTime(maxTimesVisited){
	

} */
	
function getAndSave(){

	var time=document.getElementById("input2").value;
		if (time==null) time=10;
	console.log(time);
	var numSites=document.getElementById("input1").value;
			if (numSites==null) numSites=3;
	var backlog=document.getElementById("input3").value;
			if (backlog==null) backlog=15;

	getHistory(time,numSites,backlog)
			//getHistory(amtTime,3,15);
	//document.write(bluh[0]);
	//checkForTime(7);
}	
	
//getAndSave(100);

/*
  function(historyItems) {
      // For each history item, get details on all visits.
      for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var processVisitsWithUrl = function(url) {
          // We need the url of the visited item to process the visit.
          // Use a closure to bind the  url into the callback's args.
          return function(visitItems) {
            processVisits(url, visitItems);
          };
        };
        chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
        numRequestsOutstanding++;
      }
      if (!numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    });


  // Maps URLs to a count of the number of times the user typed that URL into
  // the omnibox.
  var urlToCount = {};

  // Callback for chrome.history.getVisits().  Counts the number of
  // times a user visited a URL by typing the address.
  var processVisits = function(url, visitItems) {
    for (var i = 0, ie = visitItems.length; i < ie; ++i) {
      // Ignore items unless the user typed the URL.
      if (visitItems[i].transition != 'typed') {
        continue;
      }

      if (!urlToCount[url]) {
        urlToCount[url] = 0;
      }

      urlToCount[url]++;
    }

    // If this is the final outstanding call to processVisits(),
    // then we have the final results.  Use them to build the list
    // of URLs to show in the popup.
    if (!--numRequestsOutstanding) {
      onAllVisitsProcessed();
    }
  };

  // This function is called when we have the final list of URls to display.
  var onAllVisitsProcessed = function() {
    // Get the top scorring urls.
    urlArray = [];
    for (var url in urlToCount) {
      urlArray.push(url);
    }

    // Sort the URLs by the number of times the user typed them.
    urlArray.sort(function(a, b) {
      return urlToCount[b] - urlToCount[a];
    });

    buildPopupDom(divName, urlArray.slice(0, 10));
  };
}
*/