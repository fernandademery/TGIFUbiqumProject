var members = data.results[0].members;
console.log(data.results[0].members);

// Sorting the members array, based on the percentage of votes with party.
var votesWithParty = [];
var votesWithParty = Array.from(members);
console.log(votesWithParty);
var pontoDeCorte = Math.ceil(votesWithParty.length * 0.1);
console.log(pontoDeCorte);
var leastLoyal = [];


var mostLoyal = [];


function leastLoyalArray(membersArray) {
    membersArray.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < membersArray.length; i++) {
        if (membersArray[i].votes_with_party_pct <= membersArray[pontoDeCorte - 1].votes_with_party_pct) {
            leastLoyal.push(membersArray[i]);
        }
    }

    return leastLoyal;
}


leastLoyalArray(votesWithParty);
console.log(leastLoyal);

// Function to create the table showing the 10% least loyal members.

function leastLoyalTable(membersArray) {
    var tbodyLeastLoyal = document.getElementById("tbody-least-loyal");
    tbodyLeastLoyal.innerHTML = "";

    for (var i = 0; i < membersArray.length; i++) {
        var trLeastLoyal = document.createElement("tr");

        var nameLeastLoyal = document.createElement("td");

        var nameLL = membersArray[i].last_name +
            " " +
            membersArray[i].first_name +
            " " +
            (membersArray[i].middle_name || "");

        if (!membersArray[i].url) {
            nameLeastLoyal.textContent = nameLL
        } else {
            var nameLink = document.createElement("a");
            nameLink.textContent = nameLL;
            nameLink.setAttribute("href", membersArray[i].url);
            nameLink.setAttribute("target", "_blank");

            nameLeastLoyal.appendChild(nameLink);
        }

        var partyVotes = document.createElement("td");
        partyVotes.textContent = membersArray[i].total_votes - membersArray[i].missed_votes;

        var partyVotesPct = document.createElement("td");
        partyVotesPct.textContent = membersArray[i].votes_with_party_pct + "%";

        tbodyLeastLoyal.appendChild(trLeastLoyal);
        trLeastLoyal.append(nameLeastLoyal, partyVotes, partyVotesPct);

    }
}

leastLoyalTable(leastLoyal);


// Sorting array from most loyal to least loyal
function mostLoyalArray(membersArray) {
    membersArray.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    for (var i = 0; i < membersArray.length; i++) {
        if (membersArray[i].votes_with_party_pct >= membersArray[pontoDeCorte - 1].votes_with_party_pct) {
            mostLoyal.push(membersArray[i]);
        }
    }

    return mostLoyal;
}


mostLoyalArray(votesWithParty);
console.log(mostLoyal);


// Function to create the table showing the 10% least loyal members.

function mostLoyalTable(membersArray) {
    var tbodyMostLoyal = document.getElementById("tbody-most-loyal");
    tbodyMostLoyal.innerHTML = "";

    for (var i = 0; i < membersArray.length; i++) {
        var trMostLoyal = document.createElement("tr");

        var nameMostLoyal = document.createElement("td");

        var nameML = membersArray[i].last_name +
            " " +
            membersArray[i].first_name +
            " " +
            (membersArray[i].middle_name || "");

        if (!membersArray[i].url) {
            nameMostLoyal.textContent = nameML
        } else {
            var nameLink = document.createElement("a");
            nameLink.textContent = nameML;
            nameLink.setAttribute("href", membersArray[i].url);
            nameLink.setAttribute("target", "_blank");

            nameMostLoyal.appendChild(nameLink);
        }

        var partyVotes = document.createElement("td");
        partyVotes.textContent = membersArray[i].total_votes - membersArray[i].missed_votes;

        var partyVotesPct = document.createElement("td");
        partyVotesPct.textContent = membersArray[i].votes_with_party_pct + "%";

        tbodyMostLoyal.appendChild(trMostLoyal);
        trMostLoyal.append(nameMostLoyal, partyVotes, partyVotesPct);

    }
}

mostLoyalTable(mostLoyal);