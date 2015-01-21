# Drag Race!

Build an in-browser game that will let a player race their awesome dragster on a race-track, by using the keyboard to control it.

## What should it do?

* When the game starts, the dragstrip's starting light should be red
* The game should start with a dragster that has its engine off at the dragstrip
* The player should be able to start the engine with one of the keyboard keys
* 5-10 Seconds after the player has started their engine, the dragstrip's light should switch automatically from red, to yellow, to green. The time between the lights switching is up to you.
* If the player attempts to drive the car before the light is green, a false start should be indicated
* If the light is green, the player should be able to race their dragster down the racetrack
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
