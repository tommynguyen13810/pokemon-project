export function Button(name){
  console.log("here")
  return `<button class="btn btn-danger">${name}</button>`
}


export function Battle(damage1,damage2){
  return `<section class="container-fluid computerDisplay">
		<div class="row align-items-center">
			<div class="col-6 justify-content-center">
				<div class="progress">
					<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="${damage1}" aria-valuemin="0"
					 aria-valuemax="100" style="width: ${damage1}%"></div>
				</div>
			</div>
			<div class="col-6">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/175.png" alt="" id="pokeSprite">
      </div>
		</div>
	</section>

  <section class="container-fluid playerDisplay">
		<div class="row align-items-center">
			<div class="col-6">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png" alt="" id="pokeSprite">
      </div>
			<div class="col-6 justify-content-center">
				<div class="progress computerDisplay">
					<div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="${damage2}" aria-valuemin="0"
					 aria-valuemax="100" style="width: ${damage2}%"></div>
				</div>
			</div>
		</div>
	</section>
	<div class="movemenu"></section>`
}
