
character_frequency = {
	"e":  0.0938983146335448,
	"a":  0.0604449922362805,
	"t":  0.0587346334267138,
	"o":  0.0554098944203663,
	"n":  0.0553722709985905,
	"r":  0.0517577247046106,
	"d":  0.0456724521913371,
	"i":  0.0413879999707373,
	"s":  0.03982662796704,
	"S":  0.0366169952433349,
	"l":  0.0359055285601023,
	"R":  0.0282637449503377,
	"-":  0.0243051193397683,
	"M":  0.0235819378701687,
	"A":  0.0224179207260407,
	"c":  0.0217006452586966,
	"P":  0.0180834497702893,
	"H":  0.0180268688104094,
	"h":  0.0173154507362488,
	"m":  0.0161763700460884,
	"L":  0.0154480117103143,
	"g":  0.0143020771409933,
	"N":  0.0133933305387978,
	"u":  0.0131086515082678,
	"y":  0.011437568828927,
	"k":  0.00977168732029682,
	"E":  0.00941093509199012,
	"f":  0.00927837815247757,
	"w":  0.0090939796376111,
	"/":  0.00907708798506963,
	"O":  0.00906167890922603,
	"D":  0.008489890394563,
	"C":  0.00797028371875831,
	"_":  0.00779575284552039,
	"B":  0.00741650486529417,
	"v":  0.00682799482984188,
	"b":  0.0067740630643893,
	"T":  0.00658660217798294,
	"p":  0.0062986420350888,
	"&":  0.00628726751222634,
	"G":  0.00569360491513549,
	"I":  0.00528788929517162,
	"F":  0.00519407378609233,
	"W":  0.00507340176469889,
	"U":  0.00502576487407832,
	"V":  0.00299329804849401,
	"$":  0.00278999060459551,
	"j":  0.00272490305710475,
	"K":  0.00190105219926521,
	"Z":  0.00167737755417281,
	"(":  0.00165013216928216,
	")":  0.00164998634206598,
	"+":  0.00107829504554706,
	"'":  0.000964987298570993,
	"x":  0.000957331369721258,
	"%":  0.000741580003374928,
	"J":  0.000604526724696663,
	"Y":  0.000498437424921769,
	"z":  0.000257239209351083,
	"Q":  0.000152559572665981,
	":":  0.000106453867815357,
	"q":  7.65592884973461E-05,
	";":  4.86819856698997E-05,
	"#":  2.76342574671373E-05,
	">":  1.93464106805992E-05,
	"X":  1.90790607842593E-05,
	"[":  1.36591492493678E-05,
	"]":  1.34404084250896E-05,
	"|":  8.14201957035268E-06,
	"<":  7.14553359308563E-06,
	"=":  4.98242988633522E-06,
	"@":  4.10746658922269E-06,
	"?":  1.99297195453409E-06,
	"\\": 1.79853566628686E-06,
	"{":  4.37481648556263E-07,
	"}":  4.37481648556263E-07,
	"`":  1.94436288247228E-07,
	"~":  1.21522680154518E-07,
	"*":  2.43045360309035E-08,
}





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

	expected_width = 0
	for(character in character_frequency){
		freq = character_frequency[character]
		expected_width+=result[character].width*freq
	}
	result.stat_width = expected_width

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