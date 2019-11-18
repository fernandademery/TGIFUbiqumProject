var members = data.results[0].members;
console.log(data.results[0].members);

// To format senate data as a table

function myTable(senate) {
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < senate.length; i++) {
    var tr = document.createElement("tr");

    var name = document.createElement("td");

    var senatorName = senate[i].last_name +
      " " +
      senate[i].first_name +
      " " +
      (senate[i].middle_name || "");

    if (!senate[i].url) {
      name.textContent = senatorName
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

document.getElementById("republican").addEventListener("change", selectParty);
document.getElementById("democrat").addEventListener("change", selectParty);
document.getElementById("independent").addEventListener("change", selectParty);

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
document.getElementById("state-filter").addEventListener("change", filterState);


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