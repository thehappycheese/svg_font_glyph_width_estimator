import os
import csv
letters = {}
total_letters = 0
for dirpath, dirnames, filenames in os.walk("."):
	for file in filenames:
		if file[-4:] != ".csv":
			continue
		with open(os.path.join(dirpath, file), "r") as f:
			print("processing "+file)
			txt = f.read()
			for letter in txt:
				total_letters += 1
				if letter in letters:
					letters[letter] += 1
				else:
					letters[letter] = 1
	break
print(letters)
with open("letter_frequency_analysis.csv", "w", newline='\n', encoding='utf-8') as f:
	csv_out = csv.writer(f)
	csv_out.writerow(['letter', 'count', 'fraction'])
	for letter, count in letters.items():
		csv_out.writerow([letter, count, float(count)/total_letters])
