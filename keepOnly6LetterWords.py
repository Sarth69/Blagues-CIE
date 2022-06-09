f = open("ods6.txt", "r")
Lines = f.readlines()
lines6 = []
for line in Lines:
    if len(line) == 7:
        lines6.append(line)
exportFile = open("6letterWords.txt", "w")
exportFile.writelines(lines6)
