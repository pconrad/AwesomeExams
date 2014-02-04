/*

  bits.js

  This is a library that will enable us to perform bitwise and shift operations on numbers that 
  are larger than 32 bits. It can handle unsigned numbers that are up to 62 bits. 
  
  If we used all possible 64/2=32 bits, the leading sign bit would cause us problems 
  (hence we use 32-1=31 bits maximum).

  By default, it will split a 64 bit number into two, 32 bit numbers.   
  
  The number 32 can be changed, if desired. To do so, change the value of sizeOfSmallerNumbers. This would change the size of the two numbers we use to store the upper and lower bits of the original, larger number. Note that if you want to store a number of size x, the size of the two smaller numbers must be at least  the ceiling of x/2. If this number is changed, it must be less than 32 (and thus the greatest number we can store is 31*2=62). Otherwise, unwanted behavior may occur.
  
  NOTE: This has only been tested with 2, 32 bit numbers. The addition and multiplication function probably won't work without a few edits for it to work with other numbers.
*/

/* sizeOfSmallerNumbers can be changed, though undesired results may occur. */
sizeOfSmallerNumbers = 32;

/* LongBitsString is our object that has the two smaller numbers that together represent the larger number. With these two components we are able to perform the bitwise and shift operations. */
function LongBitString(highBits,lowBits) {

	//Properties of our LongBitString object (the two 32 bit numbers)
    this.highBits = highBits;
    this.lowBits = lowBits;  
      
    //toString for this object (for testing-i.e. printing out the values we get)
    this.toString = function(){
	    var highBitsString=this.highBits.toString(16);
	    var lowBitsString = this.lowBits.toString(16);
	    return "high bits: " + highBitsString + " low bits: " + lowBitsString; 
    }  
      
    //isEqual test used in qunit testing so we can compare our "longBitString" objects
    this.isEqual = function(correctLongBitString){
	    return (this.highBits===correctLongBitString.highBits && this.lowBits===correctLongBitString.lowBits);
	    }
	
	//combineBits merges the two highBits and lowBits into one JS integer (NOTE: this should only be called on numbers of 53 bits or less bits!!!)  
	this.combineBits = function(){
		if (this.highBits > Math.pow(2, 53-32)){
			return null; //if this happens, it's because JS can't actually store the number you want
		}
		else {
		var actualHighBits = (this.highBits * Math.pow(2, 32));
		return (this.lowBits + actualHighBits);
		}
	}
       
    //AND implementation   
    this.bitwiseAnd = function (otherLongBitString) {
	
		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var andedSignBits = new LongBitString(signBits.highBits & otherSignBits.highBits, signBits.lowBits & otherSignBits.lowBits);
	
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var andedNonSignBits = new LongBitString(nonSignBits.highBits & otherNonSignBits.highBits, nonSignBits.lowBits & otherNonSignBits.lowBits);
		
		
		//now we must put these two sets of bits together:
		return (new LongBitString(andedNonSignBits.highBits + (andedSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), andedNonSignBits.lowBits + (andedSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));
    }

    //OR implementation
    this.bitwiseOr = function(otherLongBitString) {
    
   		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var oredSignBits = new LongBitString(signBits.highBits | otherSignBits.highBits, signBits.lowBits | otherSignBits.lowBits);
	
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var oredNonSignBits = new LongBitString(nonSignBits.highBits | otherNonSignBits.highBits, nonSignBits.lowBits | otherNonSignBits.lowBits);
		
		//now we must put these two sets of bits together:
		return (new LongBitString(oredNonSignBits.highBits + (oredSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), oredNonSignBits.lowBits + (oredSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));
    }
    
    
    //XOR implementation
    this.bitwiseXOr = function(otherLongBitString){
	
		//we have to handle the sign bits separately:
		var signBits = new LongBitString(this.highBits >>> 31 ,this.lowBits >>>31);
		var otherSignBits = new LongBitString(otherLongBitString.highBits >>> 31 ,otherLongBitString.lowBits >>>31);
		var xoredSignBits = new LongBitString(signBits.highBits ^ otherSignBits.highBits, signBits.lowBits ^ otherSignBits.lowBits); 
		
		//then we can remove the signed bits, and handle the rest of the bits
		var nonSignBits = new LongBitString((this.highBits << 1) >>> 1 , (this.lowBits <<1) >>> 1);
		var otherNonSignBits = new LongBitString((otherLongBitString.highBits << 1) >>> 1 , (otherLongBitString.lowBits <<1) >>> 1);
		
		var xoredNonSignBits = new LongBitString(nonSignBits.highBits ^ otherNonSignBits.highBits, nonSignBits.lowBits ^ otherNonSignBits.lowBits);
		
		//now we must put these two sets of bits together:
		return (new LongBitString(xoredNonSignBits.highBits + (xoredSignBits.highBits * Math.pow(2, sizeOfSmallerNumbers-1)), xoredNonSignBits.lowBits + (xoredSignBits.lowBits * Math.pow(2, sizeOfSmallerNumbers-1))));

	}
	
	//RightShift shifts bits numLessThan32 spots to the right  (>>numLessThan32)
	this.rightShift = function(numLessThan32){
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits >>>= numLessThan32;
		x.highBits <<= 32-numLessThan32;
		x.highBits >>>= (32-sizeOfSmallerNumbers);
		x.lowBits += x.highBits;
		x.highBits = this.highBits >>> numLessThan32;
		return x;  
	} 
	
	
	
	//Plus sums this and addend, and returns the result
	//Note: overflow behaves like that of Java. If the result is larger than sizeOfSmallerNumbers, the higher overflow bits are tuncated
	//Note: untested for sizeOfSmallerNumbers not divisible by 4
	this.plus = function(addend){
		
		var x = new LongBitString(this.highBits, this.lowBits);
		x.lowBits += addend.lowBits;
		x.highBits += addend.highBits;

		//check overflow from lowBits
		var overflowBits = Math.floor(x.lowBits / Math.pow(2, sizeOfSmallerNumbers));
		x.lowBits -= overflowBits * Math.pow(2, sizeOfSmallerNumbers);
		x.highBits +=overflowBits;
		
		//truncate any overflow on the highBits (like in Java)
		 if (x.highBits >= Math.pow(2,32)){ //overflow check
	
			var currentOverflow = Math.floor(x.highBits / Math.pow(2,32)) * Math.pow(2,32); 
			x.highBits -= currentOverflow;
		}

				
		return x;
	}
	
	this.binaryPlus = function(binaryNum, currentProduct){
		
	}
	
	//Times multiplies this and multiplier, and returns the result
	//Note: overflow behaves like that of Java. If the result is larger than sizeOfSmallerNumbers, the higher overflow bits are tuncated
	this.times = function(multiplier){
	
	//First we split up the numbers as such: this = numberA*2^48 + numberB*2^32 + numberC*2^16 + numberD; multiplier = numberE*2^48 + numberF*2^32 + numberG*2^16 + numberH
	
	var numberA = Math.floor(this.highBits / Math.pow(2, 16));
	var numberB = this.highBits - (numberA * Math.pow(2, 16));
	var numberC = Math.floor(this.lowBits / Math.pow(2, 16));
	var numberD = this.lowBits - (numberC * Math.pow(2, 16));
	
	var numberE = Math.floor(multiplier.highBits / Math.pow(2, 16));
	var numberF = multiplier.highBits - (numberE * Math.pow(2, 16));
	var numberG = Math.floor(multiplier.lowBits / Math.pow(2, 16));
	var numberH = multiplier.lowBits - (numberG * Math.pow(2, 16));
	
	var product = new LongBitString(0,0);
	
	product.lowBits = numberD*numberH; //last of the FOIL product, max number of bits is 32
	//penultimate of the FOIL product, max number of bits is 49. we must split 16 of the lower bits into the lowBits
	var currentProduct = (numberD * numberG) + (numberC * numberH); //this is at maximum 33 bits on its own, plus 16 = 49
	
	var currentOverflow;
	
	if (currentProduct >= Math.pow(2,16)){
		var numForHigherBits = Math.floor (currentProduct / Math.pow(2, 16)) * Math.pow(2, 16);

		product.lowBits += (currentProduct - numForHigherBits) * Math.pow(2, 16);
		//have to check for overflow after each addition:
		if (product.lowBits > Math.pow(2,32)){
		
			currentOverflow = Math.floor(product.lowBits / Math.pow(2,32)) ; 
			product.lowBits -= currentOverflow * Math.pow(2,32);
			product.highBits += currentOverflow;
		}
		product.highBits += (numForHigherBits / Math.pow(2,16));
		//have to check for overflow after each addition:
		if (product.highBits > Math.pow(2,32)){
			currentOverflow = Math.floor(product.highBits / Math.pow(2,32)) ; 
			product.highBits -= currentOverflow * Math.pow(2,32);
		}
	}
	else {
		product.lowBits += (currentProduct * Math.pow(2,16));
		//have to check for overflow after each addition:
		if (product.lowBits > Math.pow(2,32)){
			currentOverflow = Math.floor(product.lowBits / Math.pow(2,32)) ; 
			product.lowBits -= currentOverflow * Math.pow(2,32);
			product.highBits += currentOverflow;
		}
	}
	//third to last of the FOIL can only affect the upper 32 bits of the solution:
	currentProduct = (numberD * numberF) + (numberC * numberG) + (numberB * numberH); 

	//third to last of the FOIL, so we have to check for overflow */
	product.highBits += currentProduct;

	if (product.highBits >= Math.pow(2,32)){ //overflow check
		currentOverflow = Math.floor(product.highBits / Math.pow(2,32)) * Math.pow(2,32); 
		product.highBits -= currentOverflow;
	}

	currentProduct = (numberE * numberD) + (numberC * numberF) + (numberB * numberG) + (numberA * numberH);
    product.highBits += currentProduct * Math.pow(2,16);
    if (product.highBits >= Math.pow(2,32)){ //overflow check

		currentOverflow = Math.floor(product.highBits / Math.pow(2,32)) * Math.pow(2,32); 
		product.highBits -= currentOverflow;
	}

	return product;
	}
}


/* OriginalNumber must be less than 2*sizeOfSmallerNumbers. */
/* Only works for numbers up to 0x1FFFFFFFFFFFFF (2^53-1), use longSplitBits for higher ones */
function splitBits(originalNumber){

	var highBits = Math.floor(originalNumber / Math.pow(2, sizeOfSmallerNumbers));
	var lowBits = originalNumber - (highBits * Math.pow(2, sizeOfSmallerNumbers));
	return (new LongBitString(highBits,lowBits));
}

/* OriginalNumber must be less than 2*sizeOfSmallerNumbers. */
/* This is for numbers that can't even be stored in js to begin with (larger than 54 bits) and thus need to be inputted as a string */
/* Note: input the number without 0x formatting, just enter the hex number without the leading 0x */
/* Untested for sizeOfSmallerNumbers not divisible by 4 */
function longSplitBits(originalNumberAsString){

	var stringLength = originalNumberAsString.length;

	if (stringLength > (sizeOfSmallerNumbers/4)){
		
		var newHighBits = originalNumberAsString.substring(0, stringLength-(sizeOfSmallerNumbers/4));
		var newLowBits = originalNumberAsString.substr(stringLength-(sizeOfSmallerNumbers/4), (sizeOfSmallerNumbers/4));
		return (new LongBitString(parseInt(newHighBits,16),parseInt(newLowBits,16)));
		}
	
	else{
		return (new LongBitString(parseInt("0",16),parseInt(originalNumberAsString,16)));
		}
	
}
