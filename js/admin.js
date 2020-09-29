$(function() {

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
