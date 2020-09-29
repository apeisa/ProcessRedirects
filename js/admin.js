$(function() {

	// enforce proper formatting for redirect_from input
	$("#redirect_from").on("blur", function() {
		let redirect_from = $(this).val();
		if (redirect_from.length) {
			if (redirect_from[0] != "/") {
				redirect_from = "/" + redirect_from;
			}
			$(this).val(encodeURI(redirect_from));
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
});
