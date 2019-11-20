var members = data.results[0].members;
console.log(data.results[0].members);



// To format senate data as a table

function myTable(senate) {
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < senate.length; i++) {
    var tr = document.createElement("tr");

    var name = document.createElement("td");

    var senatorName =
      senate[i].last_name +
      " " +
      senate[i].first_name +
      " " +
      (senate[i].middle_name || "");

    if (!senate[i].url) {
      name.textContent = senatorName;
    } else {
      var nameLink = document.createElement("a");
      nameLink.textContent = senatorName;
      nameLink.setAttribute("href", senate[i].url);
      nameLink.setAttribute("target", "_blank");

      name.appendChild(nameLink);
    }

    var party = document.createElement("td");
    party.textContent = senate[i].party;

    var state = document.createElement("td");
    state.textContent = senate[i].state;

    var seniority = document.createElement("td");
    seniority.textContent = senate[i].seniority;

    var percVotes = document.createElement("td");
    percVotes.textContent = senate[i].votes_with_party_pct;

    tr.append(name, party, state, seniority, percVotes); // these functions push the data into the HTML.
    tbody.appendChild(tr);
  }
}

myTable(members);

// function to filter table by party

document
  .getElementById("republican")
  .addEventListener("change", filterPartyState);
document
  .getElementById("democrat")
  .addEventListener("change", filterPartyState);
document
  .getElementById("independent")
  .addEventListener("change", filterPartyState);

/*  The function bellow is intended to select House and Senate Members by party only. It's comented because 
it was replaced by another function that filter by party AND state.

function selectParty() {
  var republican = document.getElementById("republican");
  var democrat = document.getElementById("democrat");
  var independent = document.getElementById("independent");

  var selected = [];

  for (let i = 0; i < members.length; i++) {
    if (republican.checked && members[i].party == "R") {
      selected.push(members[i]);
    }
    if (democrat.checked && members[i].party == "D") {
      selected.push(members[i]);
    }
    if (independent.checked && members[i].party == "I") {
      selected.push(members[i]);
    } else if (
      republican.checked == false &&
      democrat.checked == false &&
      independent.checked == false
    ) {
      myTable(members);
    } else {
      myTable(selected);
    }
  }
} 

*/

// To create list with states in html.

var listStates = [];

function createListStates(membersArray) {
  for (var i = 0; i < membersArray.length; i++) {
    if (!listStates.includes(membersArray[i].state)) {
      listStates.push(membersArray[i].state);
    }
  }
  listStates.sort();
  for (var i = 0; i < listStates.length; i++) {
    var option = document.createElement("option");
    option.textContent = listStates[i];
    option.setAttribute("value", listStates[i]);
    document.getElementById("state-filter").append(option);
  }
}
createListStates(members);

// Filter by State
document
  .getElementById("state-filter")
  .addEventListener("change", filterPartyState);

/* 
This function filters the members by state. It's comented because it was replaced by a function that 
filters the members by party AND state.

function filterState(membersArr) {
  var selectedStates = [];
  membersArr = members;

  var state = document.getElementById("state-filter").value;
  console.log(state);

  if (state == "all") {
    myTable(members);
  } else {

    for (var i = 0; i < membersArr.length; i++) {

      if (state == membersArr[i].state) {
        selectedStates.push(membersArr[i]);

      }




    }

    console.log(selectedStates);
    myTable(selectedStates)
  }
}


filterState(members); 
*/

function filterPartyState(allMembers) {
  allMembers = members;
  var republican = document.getElementById("republican");
  var democrat = document.getElementById("democrat");
  var independent = document.getElementById("independent");
  var state = document.getElementById("state-filter").value;

  var selected = [];

  if (
    republican.checked == false &&
    democrat.checked == false &&
    independent.checked == false &&
    state == "all"
  ) {
    myTable(members);
  } else {
    for (var i = 0; i < allMembers.length; i++) {
      if (republican.checked && allMembers[i].party == "R" && state == "all") {
        selected.push(allMembers[i]);
      }
      if (democrat.checked && allMembers[i].party == "D" && state == "all") {
        selected.push(allMembers[i]);
      }
      if (independent.checked && allMembers[i].party == "I" && state == "all") {
        selected.push(allMembers[i]);
      }
      if (
        republican.checked == false &&
        democrat.checked == false &&
        independent.checked == false &&
        state == allMembers[i].state
      ) {
        selected.push(allMembers[i]);
      }
      if (
        republican.checked &&
        allMembers[i].party == "R" &&
        state == allMembers[i].state
      ) {
        selected.push(allMembers[i]);
      }
      if (
        democrat.checked &&
        allMembers[i].party == "D" &&
        state == allMembers[i].state
      ) {
        selected.push(allMembers[i]);
      }
      if (
        independent.checked &&
        allMembers[i].party == "I" &&
        state == allMembers[i].state
      ) {
        selected.push(allMembers[i]);
      }
    }

    return myTable(selected);
  }
}