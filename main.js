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