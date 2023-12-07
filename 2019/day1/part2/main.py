import math

def computeFuelRequirement(moduleMass):
    requirement = math.floor(moduleMass / 3) - 2
    if (requirement <= 0):
        return 0
    return requirement + computeFuelRequirement(requirement)

totalFuelRequirement = 0
f = open("input.txt", "r")
for moduleMass in f:
    totalFuelRequirement = totalFuelRequirement + computeFuelRequirement(int(moduleMass))

print(totalFuelRequirement)