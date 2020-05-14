# SVG Font Glyph Width Estimator
Uses javascript and a browser to output text metrics;

To use this, clone the repository and opwn index.html in your browser. 
main.js does some measureing and outputs the result to the page.
The output is a JSON object with width and height for each glyph.
You can copy this output directly into javascript or python projects.

**Note** that outputs are divided by the font-size and are therefore unitless. When estimating text width you need to multiply the sum of glyph widths by your font-size.

For really big or really small font sizes you may wish to tweek main.js to render the fonts in a different size before it measures the glyphs. Currently i think it uses font-size=20 which corresponds to css font-size=20px. Some fonts may vary te proportions a bit at different sizes?

This script would be much improved by sampling kerning pairs, fork away!

sample output:
```python
arial = {
	"0":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"1":              {"width": 0.506597179836697, "height": 1.0906251271565754},
	"2":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"3":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"4":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"5":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"6":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"7":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"8":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"9":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"average_width":  0.5260525744700292,
	"maximum_height": 1.1510416666666667,
	" ":              {"width": 0.278124745686849, "height": 0},
	"!":              {"width": 0.2777777777777778, "height": 1.0906251271565754},
	"\"":             {"width": 0.3576388888888889, "height": 1.0906251271565754},
	"#":              {"width": 0.5927083757188585, "height": 1.0906251271565754},
	"$":              {"width": 0.5725694020589193, "height": 1.0906251271565754},
	"%":              {"width": 0.8954860263400608, "height": 1.0906251271565754},
	"&":              {"width": 0.6868056403266058, "height": 1.0906251271565754},
	"'":              {"width": 0.19062495761447484, "height": 1.0906251271565754},
	"(":              {"width": 0.3430556403266059, "height": 1.0906251271565754},
	")":              {"width": 0.3430556403266059, "height": 1.0906251271565754},
	"*":              {"width": 0.40069440205891926, "height": 1.0906251271565754},
	"+":              {"width": 0.5913195292154948, "height": 1.0906251271565754},
	",":              {"width": 0.2777777777777778, "height": 1.0906251271565754},
	"-":              {"width": 0.3430556403266059, "height": 1.0906251271565754},
	".":              {"width": 0.2777777777777778, "height": 1.0906251271565754},
	"/":              {"width": 0.30625004238552517, "height": 1.0906251271565754},
	":":              {"width": 0.2777777777777778, "height": 1.0906251271565754},
	";":              {"width": 0.2777777777777778, "height": 1.0906251271565754},
	"<":              {"width": 0.5913195292154948, "height": 1.0906251271565754},
	"=":              {"width": 0.5913195292154948, "height": 1.0906251271565754},
	">":              {"width": 0.5913195292154948, "height": 1.0906251271565754},
	"?":              {"width": 0.5559027777777777, "height": 1.0906251271565754},
	"@":              {"width": 1.020138973659939, "height": 1.1510416666666667},
	"A":              {"width": 0.7069444444444444, "height": 1.0906251271565754},
	"B":              {"width": 0.6666666242811415, "height": 1.0906251271565754},
	"C":              {"width": 0.7236110263400608, "height": 1.0906251271565754},
	"D":              {...}
}
```

If you paste the results above into some python module (i suggest **font_profiles.py**) then the following snippet will estimate the width of a given string</p>

```python		
from . import font_profiles

def width_estimate(line_of_text, font_family, font_size):
	linewidth = 0
	for char in line:
		if char in font_profiles[font_family]:
			linewidth += font_profiles[font_family][char]["width"]
		else:
			linewidth += font_profiles[font_family]["_"]
	return linewidth

print(width_estimate("lorem ipsum", "arial", 12))</pre>
```