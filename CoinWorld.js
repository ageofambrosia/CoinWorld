// Global Definitions
var debuggingMode = 1;
var maxSafeInt = Number.MAX_SAFE_INTEGER;

// Core Data Mapping
var versionMajor = 0;
var versionMinor = 1;

// Unlock Data Mapping

// void devUnlockAll()
// = Console command to unlock all books, resources, etc.
// = Created for debugging, kind of ruins the fun.
function devUnlockAll()
{
	debugLog("+ devUnlockAll()");
	
}

// Resource Data Mapping

// void gameStart()
// = Spin up the game.
function gameStart()
{
	debugLog("+ gameStart()");
	
	// Display Unlocked Resources
	
	// Start Game Loop
	gameTick();
	setInterval(gameTick, 1000);
	
	// Load Interactive Box
}

// void gameTick()
// = Calls other tick functions to update resources and other
// = time-dependent features.
function gameTick()
{
	//debugLog("+ gameTick()");
	
	// Basic Resources
	tickResourceDust();
}

// void tickResourceDust()
// = Calculates the Dust rate for this tick and adds it to the Stored Dust.
function tickResourceDust()
{
	if (resourceDustUnlocked)
	{
		// Generate Resource Rate
		resourceDustRate = 0;
		
		resourceDustStored += resourceDustRate;
		resourceDustAlltime += resourceDustRate;
		if (resourceDustStored > resourceDustCap) resourceDustStored = resourceDustCap;
		$("#resourceDustStored").html(resourceDustStored);
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
	debugLog("+ logMessage");
	
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

// void drawOldManStudy()
// = Display the Old Man's Study in the interactive window
function drawOldManStudy()
{
	$("#boxInteractive").load("./Locations/oldManStudy.html");
}

// void debugLog(str message)
// = Prints message to console if debugging is turned on.
function debugLog(message)
{
	if (debuggingMode) console.log(message);
}