function Set(hashFunction) {
	this._hashFunction = hashFunction || JSON.stringify;
	this._values = {};
	this._size = 0;
}

Set.prototype = {
	add: function add(value) {
		if (!this.contains(value)) {
			this._values[this._hashFunction(value)] = value;
			this._size++;
		}
	},

	remove: function remove(value) {
		if (this.contains(value)) {
			delete this._values[this._hashFunction(value)];
			this._size--;
		}
	},

	contains: function contains(value) {
		return typeof this._values[this._hashFunction(value)] !== "undefined";
	},

	size: function size() {
		return this._size;
	},

	each: function each(iteratorFunction, thisObj) {
		for (var value in this._values) {
			iteratorFunction.call(thisObj, this._values[value]);
		}
	}
};


function meetsConstraints(groups) {
    for(var i=0; i<groups.length; i++) {
        var teamSet = new Set();
        var group = groups[i];

        for(var j=0; j<group.length; j++) {
            teamSet.add(group[j][1]);
        }

        if(teamSet.size() == 1) {
            // Everyone is on the same team
            return false
        }
    }

    return true;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function convertToGroups(list) {
    var maxSize = 5;

    var groups = [];

    for(var i = 0; i < list.length; i = i + maxSize) {
        var group = [];
        for(var j = 0; j < maxSize; j++) {
            var user = list[i+j];

            if(user) {
                group.push(user);
            }
        }
        groups.push(group);
    }

    var lastGroup = groups[groups.length - 1];

    if(lastGroup.length == 1) {
        groups[groups.length - 2].push(lastGroup[0]);
        groups.splice(groups.length - 1, 1);
    }

    return groups;
}

function generateUniqueGrouping(previousGrouping, userRows) {
    var result = [];
    var groupsByTitle = {};

    for(index in userRows) {
        var userRow = userRows[index];
        if(groupsByTitle[userRow[2]] === undefined) {
            groupsByTitle[userRow[2]] = []
        }
        groupsByTitle[userRow[2]].push([userRow[0], userRow[1]]);
    }

    for(groupName in groupsByTitle) {
        var group = groupsByTitle[groupName];

        do {
            group = shuffleArray(group);
            groups = convertToGroups(group);
        } while(!meetsConstraints(groups))

        for(g in groups) {
            var emailList = []

            for(u in groups[g]) {
                emailList.push(groups[g][u][0]);
            }
            result.push(emailList);
        }
    }

    return result;
}


function getFirstThursdayNextMonth(now) {
    var nextDate = new Date(now.getFullYear(), now.getMonth()+1, 1);

    var i = 1;
    while(nextDate.getDay() != 4) {
        nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), i);
        i++;
    }

    return nextDate;
};
