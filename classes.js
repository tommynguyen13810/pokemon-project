export class Pokemon {
  constructor(pokemon) {
    this.pokemon = pokemon
    this.moves = []
    this.move
    this.pokeInfo
    this.power
    this.sprite
    this.health
  }

  async updateInfo() {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemon}`
      const d = await fetch(url)
      this.pokeInfo = await d.json()
      this.pokemon = this.pokeInfo.forms[0].name
      this.sprite = this.pokeInfo.sprites.back_default
      this.health = this.pokeInfo.stats[0].base_stat * 10
      if (d.ok) {
        for(let i = 0; i <= 3; i++) {
          let rand = this.getRandomInt(this.pokeInfo.moves.length);
          const move = await fetch(this.pokeInfo.moves[rand].move.url)
          if (!move.ok) {
            console.error('Unable to fetch move')
          }
          const j = await move.json()
          this.move = j.name
          this.power = j.power
          this.moves.push(this.getMove());
        }
        console.log(this.moves)
      }
    } catch (e) {
      throw Error('Unable to Fetch Pokemon', e)
    }
  }

  getMove() {
    return {
      "move": this.move,
      "damage": this.power,
    }
  }

  getDamage(moveNum) {
    return this.moves[moveNum].damage
  }

  getMoves() {
    return this.moves
  }

  getHealth() {
    return this.health
  }

  getSprite() {
    return this.sprite
  }

  updateHealth(damage) {
    this.health = this.health - damage;
  }

  chooseMove() {
    
  }

  //random move for when computer attacks

//   getRandom(arr, n) {
//     var result = new Array(n),
//       len = arr.length,
//       taken = new Array(len);
//     if (n > len)
//       throw new RangeError("getRandom: more elements taken than available");
//     while (n--) {
//       var x = Math.floor(Math.random() * len);
//       result[n] = arr[x in taken ? taken[x] : x];
//       taken[x] = --len in taken ? taken[len] : len;
//     }
//     return result;
//   }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}




//one for pokemon 
//one for each move -> damage