class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      num++;
      currentVampire = currentVampire.creator;
    }
    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    while (currentVampire) {
      let otherVampire = vampire;
      while (otherVampire) {
        if (currentVampire === otherVampire) {
          return currentVampire;
        }
        otherVampire = otherVampire.creator;
      }
      currentVampire = currentVampire.creator;
    }
    return null;
  }

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      const vampire = offspring.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }
    return null;
  }

  get totalDescendents() {
    let total = 0;
    for (const offspring of this.offspring) {
      total += 1 + offspring.totalDescendents;
    }
    return total;
  }

  get allMillennialVampires() {
    let millennialVampires = [];
    if (this.yearConverted > 1980) {
      millennialVampires.push(this);
    }
    for (const offspring of this.offspring) {
      millennialVampires = millennialVampires.concat(offspring.allMillennialVampires);
    }
    return millennialVampires;
  }
}

module.exports = Vampire;

