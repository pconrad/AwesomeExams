function randIntBetweenInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// return seed as a hex number converted from rawTextSeed,
// or if that is not possible, return a random seed that is a
// legit positive integer between 0 and 2^32-1.
function determineSeed(rawTextSeed) {
    
    var seedToReturn = parseInt(rawTextSeed,16);

    // Use the alternative if the seed passed in was not a legit number
    if (isNaN(seedToReturn))
	    return randIntBetweenInclusive(0,0xFFFFFFFF);

    return seedToReturn;
}

// pass in url returned by purl
function linkToQuiz(url,extraParams,seed) {
    return url.attr("protocol") + "://" + url.attr("host") + url.attr("directory") + "quiz.html" + 
	"?seed=" + seed.toString(16) +
	"&jsonString=" + url.param("jsonString") +
	extraParams;
}
