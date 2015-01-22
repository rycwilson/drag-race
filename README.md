# Drag Race!

Build an in-browser game that will let a player race their awesome dragster on a race-track, by using the keyboard to control it.

## What should it do?

* When the game starts, the car should be in the pre-staging area and
  the first set of yellow lights should be on (pre-stage)
* The game should start with a dragster that has its engine off at the dragstrip
* The player should be able to start the engine with one of the keyboard keys
* After starting the engine, the player can move the dragster into the
  staging area, crossing the pre-staging line
* Once the dragster is in the staging area, the "stage" light should
  turn on
* At this point, the next 3 sets of light should turn on, with 0.5
  seconds between each set
* The second to last set is the set of green lights, which should
  indicate the start of the race
* If the player attempts to drive the car before the green lights are
  turned on, the last set of lights should be lit in red, and the race
is over
* If the light is green, the player should be able to race their dragster down the racetrack
* Crossing the finish line is the end of the race
* Use HTML, CSS, some images from google, and JS to build the game
 
## Bonuses

* Calculate the drag race time
* Restart the race keeping previous race times in a table
* Save the drag race time and show the fastest drag race time

## Super-bonus

* Two-player drag race (use different parts of the keyboard to let two players control the game)
* Add an AI that races against you 
* Give the AI different difficulty levels (easy, medium, hard) where each level is a different speed
* Add a cheat code (http://en.wikipedia.org/wiki/Konami_Code) which automatically lets you win the race. 

## Super-duper-uber bonus

* Turn the drag race into a race track!
 * Implement a way to draw an arbitrary race track, defined via a two-dimensional array, with coordinates in the cartesian plane
 * The two-dimensional array should be represented on screen by having the race-track be drawn based on it
 * The AI should be able to navigate the race track, and your car should only be able to move along the race track
