var api_key = "kep2iZ5i0yQ7SpwQgNys-Vs4Fp8KhwL2N0p50QbFd1l8Fa05OW8EtF_XKg2T4ccN";

function injectOurselves() {
	// This used to nullify Facebook's Ajaxy behavior
	window.addEventListener("hashchange", function(event) {
		document.location.reload();
	}, false);

	// No HTML5 history love today
	var node = document.createElement("script");
	node.text = 'window.history.replaceState = null;window.history.pushState = null;';
	document.body.appendChild(node);

	// get the profile name and move it up to the body for use later
	var nameparts = document.getElementsByClassName("profileName")[0].innerHTML.split(" ");
	document.body.setAttribute("data:FBfirstName", nameparts[0]);
	document.body.setAttribute("data:FBlastName", nameparts[nameparts.length - 1]);
	
	// this is where we put our login button code and other scripts related to making this work
	var container = document.getElementById("profile_view_actions");
	
	// this script node does the meat of the work when the user is authenticated
	var node = document.createElement("script");
	node.text = "function loadData() {\n  IN.API.PeopleSearch()\n    .fields(['publicProfileUrl','firstName','lastName'])\n    .params({'first-name': document.body.getAttribute('data:FBfirstName'),'last-name': document.body.getAttribute('data:FBlastName'),'sort': 'distance','count': 1})\n    .result(function(result) {\n      var profile = result.people.values[0];\nconsole.log(profile);      var script = document.createElement('script');\n      script.type = 'IN/MemberProfile';\n      script.setAttribute('data-id', profile.publicProfileUrl);\n      script.setAttribute('data-format', 'inline');\n      script.setAttribute('data-text', profile.firstName + ' ' + profile.lastName);\n      script.setAttribute('data-width', 482);\n      document.getElementById('pagelet_main_column_personal').insertBefore(script, document.getElementById('pagelet_main_column_personal').firstChild);\n      IN.parse();\n    });\n}";
	container.insertBefore(node, container.firstChild);
	
	// now put our JSAPI login button into the container
	var node = document.createElement("script");
	node.type = "IN/Login";
	node.id = "LI-login";
	node.setAttribute("data-onauth", "loadData");
	container.insertBefore(node, container.firstChild);
	
	// And stick in the LI JSAPI
	var node = document.createElement("script");
	node.src = "http://platform.linkedin.com/in.js";
	node.text = "authorize: true \n api_key: " + api_key;
	container.insertBefore(node, container.firstChild);
}

if(window.top === window) {
	injectOurselves();
}
