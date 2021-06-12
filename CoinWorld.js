// Global Definitions
var debuggingMode = 1;
var maxSafeInt = Number.MAX_SAFE_INTEGER;

// Core Data Mapping
var versionMajor = 0;
var versionMinor = 1;

// Unlock Data Mapping
var unlockedSyndicateMining = 1;
var unlockedResourceOre = 1;
var unlockedResourceSortedOre = 0;

// void devUnlockAll()
// = Console command to unlock all books, resources, etc.
// = Created for debugging, kind of ruins the fun.
function devUnlockAll()
{
	debugLog("devUnlockAll()");
	
	unlockedSyndicateMining = 1;
	unlockedOre = 1;
	unlockedSortedOre = 1;
}

// Resource Object
function resourceObject() 
{
	this.stored = 0;
	this.alltime = 0;
	this.cap = maxSafeInt;
}

function resourceGain(object, numGained)
{
	object.stored += numGained;
	object.alltime += numGained;
	
	if (object.stored > object.cap)
	{
		object.stored = object.cap;
	}
}

function resourceSpend(object, numSpent)
{
	if (numSpent <= object.stored)
	{
		object.stored -= numSpent;
		return true;
	}
	return false;
}

// Resource Data Mapping
var resourceMiningRep = new resourceObject();
var resourceOre = new resourceObject();
var resourceSortedOre = new resourceObject();

// void gameStart()
// = Spin up the game.
function gameStart()
{
	debugLog("gameStart()");
	
	// Draw Boxes
	drawBoxSyndicate(0);
	drawBoxInteractive(0);
	drawBoxNavigation();
	
	// Start Game Loop
	gameTick();
	setInterval(gameTick, 1000);
}

// void gameTick()
// = Calls other tick functions to update resources and other
// = time-dependent features.
function gameTick()
{
	//debugLog("gameTick()");
	
	// Basic Resources
	tickResourceOre();
}

// void tickResourceOre()
// = Calculates the Ore rate for this tick and adds it to the Stored Ore
function tickResourceOre()
{
	if (unlockedResourceOre)
	{
		// Generate Resource Rate
		//resourceRockCoinRate = 0;
		
		//resourceDustStored += resourceDustRate;
		//resourceDustAlltime += resourceDustRate;
		//if (resourceDustStored > resourceDustCap) resourceDustStored = resourceDustCap;
		//$("#resourceDustStored").html(resourceDustStored);
	}
}

// Log Color Mapping
	// 0 = Black

// void logMessage(str message, int color)
// = Appends message to the log.
var logBuffer = "";
var maxLogSize = 16;
function logMessage(message, color)
{
	debugLog("logMessage");
	
	// Get message color.
	var logColor = "Black";
	switch (color)
	{
		case 0:
			logColor = "Black";
			break;
		default:
			logColor = "Black";
	}
	
	// Add new message to log.
	logBuffer = $("#logSpace").html();
	logBuffer = logBuffer.replace("fadeIn", "");
	logBuffer += "<p class = \"logMessage animated fadeIn\" style = \"" + logColor + "\">" + message + "</p>";
	
	// Check number of messages in log.
	var count = (logBuffer.match(/<\/p>/g) || []).length;
	if (count > maxLogSize)
	{
		var loc = logBuffer.indexOf("</p>") + 4;
		logBuffer = logBuffer.substring(loc, logBuffer.length);
	}
	
	// Print log to page.
	$("#logSpace").html(logBuffer);
}

// void drawBoxSyndicate
// = Update the Syndicate Box for the current location
function drawBoxSyndicate(locationNumber)
{
	debugLog("Drawing Syndicate Box " + locationNumber.toString());
	
	switch(locationNumber)
	{
		case 0:
			$("#boxSyndicate").load("./Syndicates/mining.html", drawBoxSyndicateContinue(locationNumber));
			break;
		case 1:
			$("#boxSyndicate").load("./Syndicates/bakery.html");
			break;
		default:
			$("#boxSyndicate").load("./Syndicates/mining.html");
	}
}

function drawBoxSyndicateContinue(locationNumber)
{
	debugLog("Drawing Syndicate Box Continued " + locationNumber.toString());
	
	switch(locationNumber)
	{
		case 0:
			$("#resourceMiningRep").html(resourceMiningRep.stored);
			$("#resourceOre").html(resourceOre.stored);
			$("#resourceSortedOre").html(resourceSortedOre.stored);
			break;
		case 1:
			break;
		default:
			$("#resourceMiningRep").html(resourceMiningRep.stored);
			$("#resourceOre").html(resourceOre.stored);
			$("#resourceSortedOre").html(resourceSortedOre.stored);
	}
}

// void drawBoxInteractive()
// = Update the Interactive Box for the current location
function drawBoxInteractive(locationNumber)
{
	debugLog("Drawing Interactive Box " + locationNumber.toString());
	
	switch(locationNumber)
	{
		case 0:
			//$("#boxInteractive").load("./Interactives/mining.html", drawBoxInteractiveContinue(locationNumber));
			$("#boxInteractive").load("./Interactives/mining.html", drawBoxInteractiveContinue(locationNumber));
			break;
		case 1:
			$("#boxInteractive").load("./Interactives/bakery.html");
			break;
		default:
			$("#boxInteractive").load("./Interactives/mining.html", drawBoxInteractiveContinue(locationNumber));
	}
}

function drawBoxInteractiveContinue(locationNumber)
{
	debugLog("Drawing Interactive Box Continued " + locationNumber.toString());
	
	switch(locationNumber)
	{
		case 0:
			debugLog("loadcheck 1");
			$("#miningSortOre").html('<span class = "button hvr-reveal" onclick = "miningSort();">Unlock Ore Sorting</span>');
			debugLog("loadcheck 2");
			break;
		default:
			$("#miningSortOre").html('<span class = "button hvr-reveal" onclick = "miningSort();">Unlock Ore Sorting</span>');
	}
}

// void drawBoxNavigation()
// = Update the Navigation Box for unlocked locations
function drawBoxNavigation()
{
	debugLog("Drawing Navigation Box ");
	
	$("#boxNavigation").load("./navigation.html");
}

// void miningOre()
// = Manually mines Ore
function miningOre()
{
	resourceGain(resourceOre, 1);
	$("#resourceOre").html(resourceOre.stored);
}

// void miningOreContribute()
// = Contributes Ore to the syndicate for reputation
function miningOreContribute()
{
	if (resourceSpend(resourceOre, 50))
	{
		resourceGain(resourceMiningRep, 1);
	}
	$("#resourceOre").html(resourceOre.stored);
	$("#resourceMiningRep").html(resourceMiningRep.stored);
}

// void miningSort()
// = Manually sorts Ore
function miningSort()
{
	if (unlockedResourceSortedOre == 0)
	{
		if (resourceSpend(resourceMiningRep, 100))
		{
			unlockedResourceSortedOre = 1;
			$("#miningSortOre").html('<span class = "button hvr-reveal" onclick = "miningSort();">Sort Ore</span>');
		}
	}
	else if (resourceSpend(resourceOre, 10))
	{
		resourceGain(resourceSortedOre, 1);	
	}
	$("#resourceOre").html(resourceOre.stored);
	$("#resourceSortedOre").html(resourceSortedOre.stored);
}

// void debugLog(str message)
// = Prints message to console if debugging is turned on.
function debugLog(message)
{
	if (debuggingMode) console.log("+ " + message);
}