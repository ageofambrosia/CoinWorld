// Global Definitions
var debuggingMode = 1;
var maxSafeInt = Number.MAX_SAFE_INTEGER;
var syndicateCurrent = 0;

// Core Data Mapping
var versionMajor = 0;
var versionMinor = 1;

// ###################### Resource Object ######################

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

// Mining Resources
var resourceMiningOre = new resourceObject();
var resourceMiningSortedOre = new resourceObject();
var resourceMiningRep = new resourceObject();
var resourceMiningCoin = new resourceObject();

// Bakery Resources
var resourceBakeryRep = new resourceObject();
var resourceBakeryCoin = new resourceObject();

// #################### End Resource Object ####################

// ======================= Game Loop ===========================

// void gameStart()
// = Spin up the game.
function gameStart()
{
	debugLog("gameStart()");
	
	// Draw Boxes
	updateSyndicate(syndicateCurrent);
	updateCoins();
	updateInteractive();
	updateNavigation();
	
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
	
	// Update Coins
	updateSyndicate(syndicateCurrent);
	updateCoins();
}

// ===================== End Game Loop =========================

// +++++++++++++++++++++++ Box Updates +++++++++++++++++++++++++

// void updateBoxSyndicate
// = Update the Syndicate Box for the current location
function updateSyndicate(locationNumber)
{
	syndicateCurrent = locationNumber;
	htmlBuffer = "";
	
	switch(locationNumber)
	{
		case 0:
			// Deepcrust Mining Syndicate
			htmlBuffer += "<div class = 'syndicateTitleBox'><p class = 'syndicateTitle'>Deepcrust Mining Syndicate</p>";
			htmlBuffer += "<p>Reputation: ";
			htmlBuffer += resourceMiningRep.stored;
			htmlBuffer += "</p></div>";
			
			htmlBuffer += "<div class = 'syndicateResources'>";
			htmlBuffer += "<p>Raw Ore: ";
			htmlBuffer += resourceMiningOre.stored;
			htmlBuffer += "</p><p>Sorted Ore: ";
			htmlBuffer += resourceMiningSortedOre.stored;
			htmlBuffer += "</p></div>";
			break;
		case 1:
			// Conquest Bakers Union
		
			break;
		default:
	}
	
	$("#boxSyndicate").html(htmlBuffer);
}

// void updateCoins()
// = Update coin counts
function updateCoins()
{
	var htmlBuffer = "";
	
	if (resourceMiningCoin.alltime > 0)
	{
		htmlBuffer += "<div style='display:block;'><p>Mining Coins: ";
		htmlBuffer += resourceMiningCoin.stored
		htmlBuffer += "</p>";
	}
	
	if (resourceBakeryCoin.alltime > 0)
	{
		htmlBuffer += "<div style='display:block;'><p>Bakery Coins: ";
		htmlBuffer += resourceBakeryCoin.stored
		htmlBuffer += "</p>";
	}
	
	if (htmlBuffer == "")
	{
		$("#boxResources").hide();
	}
	
	else
	{
		$("#boxResources").show();
		$("#boxResources").html(htmlBuffer);
	}
}

// void updateInteractive()
// = Update the Interactive Box for the current location
function updateInteractive()
{
	var htmlBuffer = "";
	
	switch(syndicateCurrent)
	{
		case 0:
			htmlBuffer += "<div style = 'text-align: center;'>"
			htmlBuffer += "<p><span class = 'button hvr-reveal' onclick = 'miningOre();'>Mine Ore</span></p>"
			htmlBuffer += "<p class = 'buttonInfo'>+1 ore</p>"
			htmlBuffer += "<div>"
			
			htmlBuffer += "<div style = 'text-align: center;'>"
			htmlBuffer += "<p><span class = 'button hvr-reveal' onclick = 'miningOreContribute();'>Contribute Ore</span></p>"
			htmlBuffer += "<p class = 'buttonInfo'>-50 ore, +1 rep</p>"
			htmlBuffer += "<div>"
		
			break;
		case 1:
		
			break;
		default:
	}
	
	$("#boxInteractive").html(htmlBuffer);
}

// void updateNavigation()
// = Update navigation console
function updateNavigation()
{
	var htmlBuffer = "";
	
	htmlBuffer += "<p class = 'textButton' onclick = 'updateSyndicate(0); drawBoxInteractive(0);'>Deeprock Mining Syndicate</p>";
	htmlBuffer += "<p class = 'textButton' onclick = 'updateSyndicate(1); drawBoxInteractive(1);'>Bakery</p>";
	
	$("#boxNavigation").html(htmlBuffer);
}

// +++++++++++++++++++++ End Box Updates +++++++++++++++++++++++

// ======================= Message Log =========================

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

// void debugLog(str message)
// = Prints message to console if debugging is turned on.
function debugLog(message)
{
	if (debuggingMode) console.log("+ " + message);
}

// ===================== End Message Log =======================

// void miningOre()
// = Manually mines Ore
function miningOre()
{
	resourceGain(resourceMiningOre, 1);
	updateSyndicate(0);
}

// void miningOreContribute()
// = Contributes Ore to the syndicate for reputation
function miningOreContribute()
{
	if (resourceSpend(resourceMiningOre, 50))
	{
		resourceGain(resourceMiningRep, 1);
	}
	updateSyndicate(0);
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