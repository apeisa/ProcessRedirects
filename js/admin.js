$(function() {

	// enforce proper formatting for redirect_from input
	$("#redirect_from").on("blur", function() {
		let redirect_from = $(this).val();
		if (redirect_from.length) {
			if (redirect_from[0] != "/") {
				redirect_from = "/" + redirect_from;
			}
			// note: we can't use encodeURI() here since it would also unnecessarily encode various UTF-8 characters
			$(this).val(redirect_from.trim().replace(' ', '%20'));
		}
	});

	// populate the redirect_to field with the URL of the selected page and validate form values before submitting
	$("#select_page").on("pageSelected", function(event, data) {
		if (data.url.length) $("#redirect_to").val(data.url);
	});

	// validate redirects edit form before submissions
	$("#ProcessRedirectsEditForm").on("submit", function(event) {
		if ($("#redirect_to").val() == "" && $('#select_page').val() == "") {
			event.preventDefault();
			ProcessWire.alert(event.target.getAttribute('data-no-redirect-to'));
			if (typeof Inputfields === "object") {
				Inputfields.highlight("select_page");
			}
		}
	});

	// confirm delete
	let confirmed = false;
	$('#redirects_form').on('submit', function(event) {
		if (confirmed) return;
		if (!$('#redirects_form input[name="delete[]"]:checked:first').length) {
			event.preventDefault();
			ProcessWire.alert(event.target.getAttribute('data-alert-select'));
			return;
		}
		event.preventDefault();
		ProcessWire.confirm(event.target.getAttribute('data-confirm-delete'), function() {
			confirmed = true;
			event.target.submit();
		});
	});
});
