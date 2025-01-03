/*
*
* */
class Match {
    constructor(matchId) {
        // Áp dụng singleton
        if (Match[`${matchId}`]) {
            throw new Error('Match is started');
            return Match[`${matchId}`];
        }

        Match[`${matchId}`] = this;
        this.match = {id: matchId, status: 'bandPick', members: []} // Match information
        this.observers = []; // The list observer will be alert
    }

    // Loading the new members information
    loadMembers(members) {
        if (Array.isArray(members)) {
            members.map((member) => {
                if (!this.match.members.find(x => x.userId === member.userId)) {
                    this.match.members.push(member);
                }
            })
        }

    }

    // Notify a specific message to each observer
    notifyObservers(defaultMessage, specials) {
        this.observers.forEach((observer) => {
            specials['players'].includes(observer.userId) ?
                observer.update(specials.message) :
                observer.update(defaultMessage);

        })
    }

    // Adding and loading new observer or update their status if they are unavailable
    addObserver(observer) {
        const idxObserver = this.observers.findIndex(x => x.userId === observer.userId);
        const idxMember = this.match.members.findIndex(player => player.userId === observer.userId);

        if (idxObserver === -1) {
            this.observers.push(observer);
        } else {
            if (this.observers[idxObserver].status === 'unavailable')
                this.observers[idxObserver].status = 'available';
        }

        if (idxMember >= 0) {
            if (this.match.members[idxMember].status === 'unavailable')
                this.match.members[idxMember].status = 'available';
        } else {
            this.loadMembers([{...observer, status: 'available'}]);
        }
    }

    // Remove from the list observers, members (update status = 'unavailable')
    removeObserver(observer) {
        let specialMessage = {};
        const idxPlayer = this.match.members.findIndex(player => player.userId === observer.userId);
        const idxObserver = this.observers.findIndex(x => x.userId === observer.userId);

        this.match.members[idxPlayer].status = 'unavailable';
        this.observers[idxObserver].status = 'unavailable';

        specialMessage['players'] = observer.userId;
        specialMessage['message'] = 'You has been AFK!'

        this.notifyObservers(`${observer.userId} has been AFK!`, specialMessage);
    }

    // Confirmation player picked champ and notification when it's valid
    pickChamp(player, champName) {
        const idxHasInMatch = this.match.members.findIndex(x => x.userId === player.userId && x.status === 'available');
        const idxChampPicked = this.match.members.findIndex(x => x.champName === champName);
        console.log(idxHasInMatch)
        if (idxHasInMatch >= 0 && idxChampPicked === -1 && !this.match.members[idxHasInMatch].champName) {
            this.match.members[idxHasInMatch]['champName'] = champName;
            const defaultMessage = `${player.userId} has been picked ${champName}!`
            const specialsMessage = {};

            this.observers.forEach((observer) => {
                if (observer.userId === player.userId) {
                    specialsMessage['players'] = [observer.userId];
                    specialsMessage['message'] = `You have been picked ${champName}!`;
                }
            });

            this.notifyObservers(defaultMessage, specialsMessage);
        }
    }
}

class User {
    constructor(userId) {
        if (User[`${userId}`]) {
            return User[`${userId}`];
        }
        User[`${userId}`] = this;
        this.userId = userId;
    }

    update(message) {
        console.log(`Notification to ${this.userId}: ${message}`);
    }
}

const matchId = 9;
const summonersRift = new Match(matchId);
const user1 = new User('user_1');
const user2 = new User('user_2');
const user3 = new User('user_3');

summonersRift.addObserver(user1);
summonersRift.addObserver(user2);

summonersRift.loadMembers([user1, user2]);

summonersRift.pickChamp(user1, 'Yasuo')
summonersRift.pickChamp(user2, 'Malphite')

summonersRift.removeObserver(user1)
summonersRift.addObserver(user1);
summonersRift.addObserver(user3);
summonersRift.pickChamp(user3, 'Garen')
summonersRift.removeObserver(user3)

