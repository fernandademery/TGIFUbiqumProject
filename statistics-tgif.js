var members = data.results[0].members;
console.log(data.results[0].members);


var statistics = {
    numberOfDemocrats: 0,
    democratsVotes: 0,
    numberOfRepublicans: 0,
    RepublicansVotes: 0,
    numberOfIndependents: 0,
    IndependentsVotes: 0,

}


function numberMembers(membersArr) {

    var numberOfDemocrats = 0;
    var democratsVotes = 0;
    var numberOfRepublicans = 0;
    var republicansVotes = 0;
    var numberOfIndependents = 0;
    var independentsVotes = 0;

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

    var numRepublicansTd = document.createElement("td");
    numRepublicansTd.textContent = numberOfRepublicans;
    console.log(numRepublicansTd);

    var numDemocratsTd = document.createElement("td");
    numDemocratsTd.textContent = numberOfDemocrats;
    console.log(numDemocratsTd);

    var numIndependentsTd = document.createElement("td");
    numIndependentsTd.textContent = numberOfIndependents;
    console.log(numIndependentsTd);

    var pctRepTd = document.createElement("td");
    if (numberOfRepublicans == 0) {
        pctRepTd.textContent = 0 + "%";
    } else {
        pctRepTd.textContent = Math.round(republicansVotes / numberOfRepublicans) + "%";
    }
    console.log(pctRepTd);

    var pctDemTd = document.createElement("td");
    if (numberOfDemocrats == 0) {
        pctDemTd.textContent = 0 + "%";
    } else {
        pctDemTd.textContent = Math.round(democratsVotes / numberOfDemocrats) + "%";
    }
    console.log(pctDemTd);

    var pctIndtd = document.createElement("td");
    if (numberOfIndependents == 0) {
        pctIndtd.textContent = 0 + "%";
    } else {
        pctIndtd.textContent = Math.round(independentsVotes / numberOfIndependents) + "%";
    }


    var trRep = document.getElementById("republican-members");
    var trDem = document.getElementById("democrat-members");
    var trInd = document.getElementById("independent-members");



    trRep.appendChild(numRepublicansTd);
    trDem.appendChild(numDemocratsTd);
    trInd.appendChild(numIndependentsTd);

    trRep.appendChild(pctRepTd);
    trDem.appendChild(pctDemTd);
    trInd.appendChild(pctIndtd);


}

numberMembers(members);