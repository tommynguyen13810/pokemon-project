export function Button(name) {
  console.log("here")
  return `<button class="btn btn-danger">${name}</button>`
}


export function Battle(playerHealth, computerHealth, p1sprite, computersprite, p1Name, computerName) {
  return `<section class="container-fluid computerDisplay">
		<div class="row align-items-center">
			<div class="col-6 justify-content-center">
        <p style="color:white">${computerName.toUpperCase()}</p>
				<div class="progress">
					<div class="progress-bar bg-success" id="computerHealth" role="progressbar" style="width: 100%" aria-valuenow="${computerHealth}" aria-valuemin="0" aria-valuemax="${computerHealth}">${computerHealth}</div>
				</div>
			</div>
			<div class="col-6">
				<img src="${computersprite}" alt="" style="width:65%;height:auto;">
      </div>
		</div>
	</section>

  <section class="container-fluid playerDisplay">
		<div class="row align-items-center">
			<div class="col-6">
				<img src="${p1sprite}" alt="" style="width:65%;height:auto;">
      </div>
			<div class="col-6 justify-content-center">
        <p style="color:white">${p1Name.toUpperCase()}</p>
        <div class="progress">
          <div class="progress-bar bg-success" id="p1Health" role="progressbar" style="width: 100%" aria-valuenow="${playerHealth}" aria-valuemin="0" aria-valuemax="${playerHealth}">${playerHealth}</div>
        </div>
			</div>
		</div>
	</section>
	<section class="container-fluid moveset py-1" style="background-color:lightgrey">
    <div class="row align-items-center py-2">
      <div class="col-6">
        <button class="btn btn-secondary btn-block" id="button0">Move 1</button>
      </div>
      <div class="col-6">
        <button class="btn btn-secondary btn-block" id="button1">Move 1</button>
      </div>
    </div>
    <div class="row align-items-center py-2">
      <div class="col-6">
        <button class="btn btn-secondary btn-block" id="button2">Move 1</button>
      </div>
      <div class="col-6">
        <button class="btn btn-secondary btn-block" id="button3">Move 1</button>
      </div>
    </div>
    <hr>
    
    <p id="msg" style="text-align:center;">Waiting For Player Move</p>
  </section>`
}

