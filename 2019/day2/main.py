
# We treat 4 number by four number
def gravityAssist(input1, input2):

    #Initialisation
    programInput = str(open("input.txt", "r").readline()).split(',')
    programInput[1] = input1 # Was '12' at part 1
    programInput[2] = input2 # Was '2' at part 2
    
    # Program
    for i in range(0, len(programInput), 4):
        currentOpCodes = (programInput[i], programInput[i+1], programInput[i+2], programInput[i+3])

        input1 = currentOpCodes[1]
        input2 = currentOpCodes[2]
        posResult = currentOpCodes[3]

        # Addition
        if(currentOpCodes[0] == '1'):
            programInput[int(posResult)] = str(int(programInput[int(input1)]) + int(programInput[int(input2)]))
        elif (currentOpCodes[0] == '2'):
            programInput[int(posResult)] = str(int(programInput[int(input1)]) * int(programInput[int(input2)]))
        elif (currentOpCodes[0] == '99'):
            return programInput[0]
        else :
            raise Exception('Something went wrong with input')


# PART 1   
# programInput = main('12', '2') 
# print('Result : ')
# print(programInput)

# print('Answer :' + programInput[0])


for i in range(0, 100):
    for j in range(0, 100):
        result= gravityAssist(str(i), str(j))
        if result == '19690720':
            print((i,j))