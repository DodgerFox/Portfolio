window.onload = function () {
	supportTeam()
}

function supportTeam() {
	$('.support-table-item__button').click(function () {
		$(this).addClass('support-table-item__button_clicked')
	})
}
