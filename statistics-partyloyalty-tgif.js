var data;
var members;
var apiLink;
if (document.title.includes("Senate")) {
    apiLink = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else {
    apiLink = "https://api.propublica.org/congress/v1/113/house/members.json";
}

fetch(apiLink, {
    method: "GET",
    headers: {
        "X-API-key": "QldaOh304w8jLHRmPrvLMTPhVYauJuHGNKkSqKNb"
    }
}).then(function (response) {
    return response.json();
}).then(function (json) {
    data = json;
    members = data.results[0].members;

    loyaltyArray(members);
    tables();

}).catch(function (error) {
    console.log(error);
});




var leastLoyal = [];


var mostLoyal = [];

function tables() {
    leastLoyalTable(leastLoyal);
    mostLoyalTable(mostLoyal);
}


// Sorting the members array, based on the percentage of votes with party.
function loyaltyArray(members) {
    var votesWithParty = Array.from(members);
    var pontoDeCorte = Math.ceil(votesWithParty.length * 0.1);

    votesWithParty.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    for (var i = 0; i < votesWithParty.length; i++) {
        if (votesWithParty[i].votes_with_party_pct <= votesWithParty[pontoDeCorte - 1].votes_with_party_pct) {
            leastLoyal.push(votesWithParty[i]);
        }
    }

    var vWithParty = Array.from(members);
    var pDeCorte = Math.ceil(vWithParty.length * 0.1);

    vWithParty.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    for (var i = 0; i < vWithParty.length; i++) {
        if (vWithParty[i].votes_with_party_pct >= vWithParty[pDeCorte - 1].votes_with_party_pct) {
            mostLoyal.push(vWithParty[i]);
        }
    }


    return [leastLoyal, mostLoyal];
}



console.log(leastLoyal);

// Function to create the table showing the 10% least loyal members.

function leastLoyalTable() {
    var tbodyLeastLoyal = document.getElementById("tbody-least-loyal");
    tbodyLeastLoyal.innerHTML = "";

    for (var i = 0; i < leastLoyal.length; i++) {
        var trLeastLoyal = document.createElement("tr");

        var nameLeastLoyal = document.createElement("td");

        var nameLL = leastLoyal[i].last_name +
            " " +
            leastLoyal[i].first_name +
            " " +
            (leastLoyal[i].middle_name || "");

        if (!leastLoyal[i].url) {
            nameLeastLoyal.textContent = nameLL
        } else {
            var nameLink = document.createElement("a");
            nameLink.textContent = nameLL;
            nameLink.setAttribute("href", leastLoyal[i].url);
            nameLink.setAttribute("target", "_blank");

            nameLeastLoyal.appendChild(nameLink);
        }

        var partyVotes = document.createElement("td");
        partyVotes.textContent = leastLoyal[i].total_votes - leastLoyal[i].missed_votes;

        var partyVotesPct = document.createElement("td");
        partyVotesPct.textContent = leastLoyal[i].votes_with_party_pct + "%";

        tbodyLeastLoyal.appendChild(trLeastLoyal);
        trLeastLoyal.append(nameLeastLoyal, partyVotes, partyVotesPct);

    }
}




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