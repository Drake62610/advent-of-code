import math

def computeFuelRequirement(moduleMass):
    return math.floor(moduleMass / 3) - 2

totalFuelRequirement = 0
f = open("input.txt", "r")
for moduleMass in f:
    totalFuelRequirement = totalFuelRequirement + computeFuelRequirement(int(moduleMass))

print(totalFuelRequirement)