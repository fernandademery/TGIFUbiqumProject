var members = data.results[0].members;
console.log(data.results[0].members);

var numberOfDemocrats = 0;
var democratsVotes = 0;
var numberOfRepublicans = 0;
var republicansVotes = 0;
var numberOfIndependents = 0;
var independentsVotes = 0;

function numberMembers(membersArr) {
    // Loop for finding number of Republicans and to sum the percentages of votes for each party.
    for (var i = 0; i < membersArr.length; i++) {
        if (membersArr[i].party == "R") {
            numberOfRepublicans++;
            republicansVotes += membersArr[i].votes_with_party_pct;
        } else if (membersArr[i].party == "D") {
            numberOfDemocrats++;
            democratsVotes += membersArr[i].votes_with_party_pct;
        } else if (membersArr[i].party == "I") {
            numberOfIndependents++;
            independentsVotes += membersArr[i].votes_with_party_pct;
        }
    }

    // Creating table cells to show the result of the number of members per party
    var numRepublicansTd = document.createElement("td");
    numRepublicansTd.textContent = numberOfRepublicans;
    console.log(numRepublicansTd);

    var numDemocratsTd = document.createElement("td");
    numDemocratsTd.textContent = numberOfDemocrats;
    console.log(numDemocratsTd);

    var numIndependentsTd = document.createElement("td");
    numIndependentsTd.textContent = numberOfIndependents;
    console.log(numIndependentsTd);

    // Creating table cells to show the average percentage of votes per party

    if (numberOfRepublicans == 0) {
        var pctRep = 0;
    } else {
        var pctRep = Math.round(republicansVotes / numberOfRepublicans);
    }
    var pctRepTd = document.createElement("td");
    pctRepTd.textContent = pctRep + "%";

    console.log(pctRepTd);

    if (numberOfDemocrats == 0) {
        var pctDem = 0;
    } else {
        var pctDem = Math.round(democratsVotes / numberOfDemocrats);
    }

    var pctDemTd = document.createElement("td");
    pctDemTd.textContent = pctDem + "%";
    console.log(pctDemTd);

    if (numberOfIndependents == 0) {
        var pctInd = 0;
    } else {
        var pctInd = Math.round(independentsVotes / numberOfIndependents);
    }
    var pctIndtd = document.createElement("td");
    pctIndtd.textContent = pctInd + "%";
    console.log(pctIndtd);

    // Creating "Total" cells.
    var totalMembers = document.createElement("td");
    totalMembers.textContent =
        numberOfRepublicans + numberOfDemocrats + numberOfIndependents;

    if (pctRep == 0 || pctDem == 0 || pctInd == 0) {
        var totalPct = (pctRep + pctDem + pctInd) / 2;
    } else {
        var totalPct = (pctRep + pctDem + pctInd) / 3;
    }
    console.log(totalPct);

    var totalPctTd = document.createElement("td");
    totalPctTd.textContent = Math.round(totalPct) + "%";
    console.log(totalPctTd.textContent);

    var trRep = document.getElementById("republican-members");
    var trDem = document.getElementById("democrat-members");
    var trInd = document.getElementById("independent-members");
    var trTot = document.getElementById("total-members");

    trRep.appendChild(numRepublicansTd);
    trDem.appendChild(numDemocratsTd);
    trInd.appendChild(numIndependentsTd);

    trRep.appendChild(pctRepTd);
    trDem.appendChild(pctDemTd);
    trInd.appendChild(pctIndtd);

    trTot.appendChild(totalMembers);
    trTot.appendChild(totalPctTd);
}

numberMembers(members);

// Creating new arrays for the missed votes

var missedVotes = [];
var leastEngaged = [];
var mostEngaged = [];
var missedVotesPct = [];

var missedVotes = Array.from(members);

// This function displays the 10 members that missed the most votes
function leastEngagedArray(membersArr) {
    missedVotes.sort(function (a, b) {
        return b.missed_votes - a.missed_votes;
    });


    for (var i = 0; i < missedVotes.length; i++) {
        if (missedVotes[i].missed_votes >= missedVotes[9].missed_votes) {
            leastEngaged.push(missedVotes[i]);
        }
    }

    return leastEngaged;
}
leastEngagedArray(leastEngaged);
console.log(leastEngaged);


// Function to create the table with the least engaged members
function leastEngagedTable(membersArr) {
    var tbody = document.getElementById("least-engaged-tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < membersArr.length; i++) {
        var trLeastEngaged = document.createElement("tr");

        var nameLeastEngaged = document.createElement("td");

        var nameLE = membersArr[i].last_name +
            " " +
            membersArr[i].first_name +
            " " +
            (membersArr[i].middle_name || "");

        if (!membersArr[i].url) {
            nameLeastEngaged.textContent = nameLE
        } else {
            var nameLink = document.createElement("a");
            nameLink.textContent = nameLE;
            nameLink.setAttribute("href", membersArr[i].url);
            nameLink.setAttribute("target", "_blank");

            nameLeastEngaged.appendChild(nameLink);
        }

        var missedVotesNr = document.createElement("td");
        missedVotesNr.textContent = membersArr[i].missed_votes;

        var missedVotesPct = document.createElement("td");
        missedVotesPct.textContent = membersArr[i].missed_votes_pct + "%";

        trLeastEngaged.append(nameLeastEngaged, missedVotesNr, missedVotesPct);
        tbody.appendChild(trLeastEngaged);


    }
}

leastEngagedTable(leastEngaged);


// This function displays the 10 members that missed the most votes
function mostEngagedArray(membersArr) {
    missedVotes.sort(function (a, b) {
        return a.missed_votes - b.missed_votes;
    });


    for (var i = 0; i < missedVotes.length; i++) {
        if (missedVotes[i].missed_votes <= missedVotes[9].missed_votes) {
            mostEngaged.push(missedVotes[i]);
        }
    }

    return mostEngaged;
}
mostEngagedArray(mostEngaged);
console.log(mostEngaged);


// Function to create the table with the MOST engaged members
function mostEngagedTable(membersArr) {
    var tbody = document.getElementById("most-engaged-tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < membersArr.length; i++) {
        var trMostEngaged = document.createElement("tr");

        var nameMostEngaged = document.createElement("td");

        var nameME = membersArr[i].last_name +
            " " +
            membersArr[i].first_name +
            " " +
            (membersArr[i].middle_name || "");

        if (!membersArr[i].url) {
            nameMostEngaged.textContent = nameME
        } else {
            var nameLink = document.createElement("a");
            nameLink.textContent = nameME;
            nameLink.setAttribute("href", membersArr[i].url);
            nameLink.setAttribute("target", "_blank");

            nameMostEngaged.appendChild(nameLink);
        }

        var missedVotesNr = document.createElement("td");
        missedVotesNr.textContent = membersArr[i].missed_votes;

        var missedVotesPct = document.createElement("td");
        missedVotesPct.textContent = membersArr[i].missed_votes_pct + "%";

        trMostEngaged.append(nameMostEngaged, missedVotesNr, missedVotesPct);
        tbody.appendChild(trMostEngaged);


    }
}

mostEngagedTable(mostEngaged);