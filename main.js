
text = document.querySelector("#letext");
span = document.querySelector("#lespan");

// Define list of characters to be profiled;
// Just use the basic ascii subset for now
// TODO: add things like em dash and common symbols like pi
all_chars = "";
for(cc=32;cc<=126;cc++){
	all_chars+=String.fromCharCode(cc)
}

function get_metric(str){
	if (str==" "){
		// because white space is collapsed, it must be sandwiched between two non-collapsing characters
		span.innerHTML = "0 0"
		rect1 = span.getBoundingClientRect()
		span.innerHTML = "00"
		rect2 = span.getBoundingClientRect()
		return {
			width:(rect1.width-rect2.width),
			height:rect1.height-rect2.height
		}
	}else{
		span.innerHTML = str+str+str
		rect = span.getBoundingClientRect()
		return {
			width:rect.width/3,
			height:rect.height
		}
	}
}



function profile_font(family){
	size = 15
	result = {family}
	text.setAttribute("style","font-family:'"+family+"';font-size:"+size+"px;")
	all_char_metric = get_metric(all_chars)
	result.average_width = all_char_metric.width/all_chars.length/size
	result.maximum_height = all_char_metric.height/size
	for(i=0;i<all_chars.length;i++){
		char=all_chars[i]
		result[char] = get_metric(char)
		result[char].width/=size
		result[char].height/=size
	}
	return result
}

function print_profile(p){
	
	lines = []
	str = p.family.toLowerCase()
	str = str.replace(/ /g,"_")
	str += "={\r\n"
	for(item in p){
		if (item!="family"){
			lines.push("\t"+JSON.stringify(item)+":"+JSON.stringify(p[item]))
		}
	}
	str+=lines.join(",\r\n")
	str+="\r\n}\r\n"
	return str
}

output = ""
output += print_profile(profile_font("Arial"));
output += print_profile(profile_font("Arial Narrow"));
output += print_profile(profile_font("Times New Roman"));
document.querySelector("#textout").innerHTML = output
document.querySelector("svg").remove()