var intranetTitle = null; 
var cdnPageProps = null;
function setCdnPageProps(){
	if (cdnPageProps == null){
		cdnPageProps = {breadcrumbs: [{title: "Home", href: "/en/index.shtml"}], lngLinks: [{
		lang: 'fr',
		href: document.querySelector('meta[name="wcms.fr_url"]').content,
		text: "FranÃ§ais",
		}],dateModified: document.querySelector('meta[name="dcterms.modified"]').content};
	}
}

function closureTemplateAssist() {
    var defTop = document.getElementById("def-top");
    defTop.outerHTML = wet.builder.top({
        "cdnEnv": "esdcprod",
        "subTheme": "esdc",
        "siteMenu": false,
        "GCToolsModal": true,
        "intranetTitle": [{
            "href": "/en/service-canada/service-delivery/sda-assist/index.shtml",
            "text": "",
            "boldText": "SDA Assist",
            "acronym": "Service Delivery Agent Assist"
        }],
        "customSearch": [{
            "action": "/cgi-bin/SearchRechercheIntraWeb/index.aspx?GoCTemplateCulture=en-CA",
            "placeholder": "Search SDA Assist",
            "method": "get",
            "hiddenInput": [{
                "name": "dL",
                "value": "1"
            }, {
                "name": "a",
                "value": "23004"
            }]
        }],
        breadcrumbs: cdnPageProps.breadcrumbs,
        lngLinks: cdnPageProps.lngLinks

    });
}

function closureTemplate() {
	if (getTemplate() == "assist"){
		closureTemplateAssist();
	}else{
		var site = window.location.href;

		var subTheme = "esdc";
		var href = "https://esdc.prv/en/index.shtml";
		var boldText = "ESDC/SC";
		var acronym = "Employment and Social Development Canada / Service Canada";

	/*	if (site.indexOf("/en/labour/") >= 0) {
			subTheme = "labour";
			href = "subtheme-labour-fr.shtml";
			boldText = "Labour Program";
			intranetTitle = [{
				"href": "https://esdc.prv/en/index.shtml",
				"text": " Intranet",
				"boldText": boldText,
				"acronym": acronym
			}];			
		} */

	/*	if (intranetTitle == null) {
			intranetTitle = [{
				"href": "https://esdc.prv/en/index.shtml",
				"text": " Intranet",
				"boldText": boldText,
				"acronym": acronym
			}];
		} */

		var defTop = document.getElementById("def-top");
		defTop.outerHTML = wet.builder.top({
			"cdnEnv": "esdcprod",
			"subTheme": subTheme,
			"GCToolsModal": true,
			"menuPath": "/_conf/assets/en/mega_menu/esdcmenu-eng.html",
			"intranetTitle": [{
				"href": "https://esdc.prv/en/index.shtml",
				"text": " Intranet",
				"boldText": boldText,
				"acronym": acronym
			}],

        "customSearch": [{
            "action": "https://esdc.prv/cgi-bin/SearchRechercheIntraWeb/index.aspx",
            "placeholder": "Search the Intranet",
            "method": "get",
            "hiddenInput": [{
                "name": "GoCTemplateCulture",
                "value": "en-CA"
            }, {
                "name": "dL",
                "value": "1"
            }]
        }],

		breadcrumbs: cdnPageProps.breadcrumbs,
		lngLinks: cdnPageProps.lngLinks
		});
	}
}

function loadJSON(callback, url) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    //xobj.open('GET', 'https://esdc.prv/cgi-bin/op-so/services/auth/user.aspx', true); // Replace 'my_data' with the path to your file
	xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
    console.log(xobj);
 }
function secure(group, url){
	let redirect_url = '/en/service-canada/ei/reference-material/401_EN.html';
	if (getPathName().indexOf(url) > -1){
		let username = sessionStorage.getItem('esdc.username');
		if (username == null){
			let re = window.location.href.replace(/^(https|http):\/\/[^\/]+/, "");
			sessionStorage.setItem('secure.redirect', re);
			window.location.replace(redirect_url + "?redirect=" + re);
		}
		
		loadJSON(function (response){
				var groups = JSON.parse(response);
				var success = false;
				for(var i=0; i < groups.length; i++) {
					if ((groups[i].name == group) || (groups[i].name == "ESDCWCMSADMIN")){
						for (var j=0; j < groups[i].usernames.length; j++) {
							if (username == groups[i].usernames[j]){
								success = true;
							}
						}
					}
				}
				if (success == false){
					window.location.replace(redirect_url);
				}

				
			}, '/js/groups.json');
	}
}
function refTop() {
	secure("EDSC.OI.ReferenceProtegee-ProtectedReference.IO.ESDC", "/en/service-canada/ei/reference-material/integrity-operations/");
	secure("EDSC.OI.ReferenceProtegee-ProtectedReference.IO.ESDC", "/en/service-canada/ei/reference-material/ic-manual/");
	secure("NA-LEGAL-OPINIONS-LEGALE-GD-FULL-RIGHTS", "/en/labour/pdg-roc/legalopinions/OHS_Interpretations/Legal_Opinions/");

	setCdnPageProps();
    document.write(wet.builder.refTop({
        cdnEnv: "esdcprod",
        subTheme: "esdc"
    }));
    var link = document.createElement("link");
    link.href = "/_conf/assets/custom.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

	if (getPathName().toLowerCase().indexOf("searchrechercheintraweb") > -1) {
		link.href = "//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}
}

function preFooter() {
    var defPreFooter = document.getElementById("def-preFooter");
    defPreFooter.outerHTML = wet.builder.preFooter({
        "cdnEnv": "esdcprod",
        "showPostContent": false,
        "dateModified": cdnPageProps.dateModified,
    });
}

function defFooter() {
	if (getTemplate() == "assist"){}
	else{
		var defFooter = document.getElementById("def-footer");
		defFooter.outerHTML = wet.builder.appFooter({
			"cdnEnv": "esdcprod",
			"subTheme": "esdc",
			"footerPath": "/_conf/assets/en/footer/esdcfooter-eng.html",
			"showFeatures": false
		});
	}
}

function getTemplate(){
	var template = null;
	if (document.querySelector('meta[name="wcms.template"]') != null)
		template = document.querySelector('meta[name="wcms.template"]').content;

	if (template == null){
		if (document.querySelector('meta[name="template"]') != null)
			template = document.querySelector('meta[name="template"]').content;
	
	}
		
	return template;
}
function getPathName(){
	let ret = window.location.pathname;

    if(ret.startsWith("/esdc-prv/_conf/form_template/")){
		ret = localStorage.getItem("enFilename");
	}
	return ret;
}

function refFooter() {
    document.write(wet.builder.refFooter({
        "cdnEnv": "esdcprod"
    }));

    let scripts = [
        "/js/commun.js",
    ];

	var template = getTemplate();
	scripts.push("/js/username.js");	
  
  let lc_arr = ["/en/service-canada/quebec","/en/service-canada/western-territories", "en/blogs","en/lb" ];
  let bool_token = false; 
   lc_arr.forEach(function(val, i) {
            if(getPathName().includes(val)){
              bool_token = true;
            }
        });
  
    if(bool_token){
      scripts.push("/js/likability.js");	
      scripts.push("/js/comments.js");
    }


	if (getPathName() == "/en/intersection/moderation.shtml"){
		scripts.push("/js/moderation.js");
	}

	if (getPathName() == "/en/lb/communications/lbzone-btn.shtml"){
		scripts.push("/js/qow.js");
	}

	if (getPathName() == "/en/lb/communications/districtHome.shtml"){
		scripts.push("/js/commentsMultiple.js");
	}

	if (getPathName() == "/en/index.shtml"){
		scripts.push("/js/caroussel.js");
	}
	if (getPathName() == "/en/blogs/index.shtml"){
		scripts.push("/js/blogs.js");
	}


	if (template == "article"){
		if (document.querySelector('meta[name="intersection.likabilityEnabled"]') != null){
			if( document.querySelector('meta[name="intersection.likabilityEnabled"]').content == "1"){
				scripts.push("/js/likability.js");
			}
		}

		if (getPathName().startsWith("/en/blogs/")){
			loadHTML( "articleLeftMenu", "/_conf/assets/en/blogsMenu_en.html" );
			scripts.push("/js/blogs.js");
		}else if(getPathName().startsWith("/en/atl-article/")){
			loadHTML( "articleLeftMenu", "/_conf/assets/en/ATL_Menu_en.html" );
			scripts.push("/js/atl-article.js");
		}else{
			loadHTML( "articleLeftMenu", "/_conf/assets/en/articlesMenu_en.html" );
			scripts.push("/js/articles.js");

        //"/js/ngs.js",
        //"/js/secawaweek.js",
        //"/js/commentsMultiple.js",
        //"/js/graphResource.js"
		}
		if (document.querySelector('meta[name="intersection.commentsEnabled"]') != null){
			if( document.querySelector('meta[name="intersection.commentsEnabled"]').content == "1"){
					scripts.push("/js/comments.js");
			}
		}

	}

	if (getPathName() == "/en/intersection/index.shtml"){
		scripts.push("/js/catquery.js");
	}

	if (getPathName() == "/en/intersection/articles.shtml"){
		scripts.push("/js/articles.js");
	}

	if (getPathName() == "/en/service-canada/atlantic/Atlantic_Portraits/index_portraits.shtml"){
		scripts.push("/js/atl-article.js");
	}
	
	if (template == "blogs"){
		scripts.push("/js/blogs.js");
	}
	if (getPathName() == "/en/intersection/our-two-cents.shtml"){
		scripts.push("/js/commun.js");
		scripts.push("/js/moderation.js");
		scripts.push("/js/ngs.js");
		scripts.push("/js/commentsMultiple.js");
	}
	
	if (template == "alt-article"){
		scripts.push("/js/likability.js");
		scripts.push("/js/articles.js");
		scripts.push("/js/comments.js");
	}

	if (getPathName().toLowerCase().indexOf("searchrechercheintraweb") > -1) {
		scripts.push("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");
	}

	// script to log search keywords not loaded for Intranet Search Template
	if (getPathName().toLowerCase().indexOf("searchrechercheintraweb") < 0) {
		scripts.push("/js/intraSearch.js");
	}

	if (getPathName() == "/en/lsu/contact/request-legal-services.shtml"){
		scripts.push("/js/requestlegalservices.js");
	}

    for (let i = 0; i < scripts.length; i++) {
		document.write('<script type="text/javascript" src="'+ scripts[i] +'"></script>');
    }
    adobeAnalitic();
}

function adobeAnalitic() {
	let creator = document.head.querySelector('meta[name="dcterms.creator"]').content;
	document.head.querySelector('meta[name="dcterms.creator"]').content = "Employment and Social Development Canada";
    document.getElementsByTagName('head')[0].appendChild(createMeta("dcterms.accessRights", "3"));
    
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "//assets.adobedtm.com/be5dfd287373/8cdb3d539c44/launch-6df9e9b447f9.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
 	document.write('<script type="text/javascript">if(typeof _satellite === "object" && typeof _satellite.pageBottom === "function"){');
	document.write('_satellite.pageBottom();');
	document.write('}</script>');

}

function createMeta(name, content) {
	var meta = document.createElement('meta');
	meta.name = name;
	meta.content = content;
    return meta;
}

//BREAD CRUMBS
function parseXml(xmlStr) {
   return new window.DOMParser().parseFromString(xmlStr, "text/xml");
}	
	
function getBC(xml, paths){
	var out = "";
	var bc = xml.getElementsByTagName("bc");
	for (i = 0; i < bc.length; i++) {

		 var xmlPath = bc[i].getElementsByTagName("path")[0].childNodes[0].textContent;
		 var xmlTitle = bc[i].getElementsByTagName("title")[0].childNodes[0].textContent;
		 var xmlHREF = bc[i].getElementsByTagName("href")[0].childNodes[0].textContent;


		for (j = 0; j < paths.length; j++){
			if (paths[j].toLowerCase() === xmlPath.toLowerCase()){
				out = out + "<li><a href=\"" + xmlHREF + "\">"+ xmlTitle + "</a></li>";
			}
		}
	}
	return out;
}


docReady(function() {
	var request = new XMLHttpRequest();
	request.open("GET", "/_conf/assets/bc.xml", true);
    request.onreadystatechange = function() {
		if (request.status === 200 && request.readyState == 4 && getPathName().toLowerCase().indexOf("searchrechercheintraweb") < 0 ) {
			var path = getPathName();
			var lang = "fr";
			if (getPathName().startsWith("/en/")){
				lang="en";
			}


			var xml = parseXml(request.responseText);
			path = path.replace(/\/[^\/]+\.shtml/, "");
			path = path.replace(/^\//, "");
			path = path.split("/");
			bc = "";
			var paths = [];
			for (var i in path) {
				bc = bc + "/" + path[i];
				paths.push(bc);
			}
			var elements = document.getElementsByClassName("breadcrumb");
			elements[0].innerHTML = getBC(xml, paths);
		}
	}

	request.send();
	
	
	if (getTemplate() == "assist"){
	}
	/* else{
		var requestBanner = new XMLHttpRequest();
		requestBanner.open("GET", "/js/banners.xml", true);
		requestBanner.onreadystatechange = function() {
			if (requestBanner.status === 200 && requestBanner.readyState == 4) {
				var xml = parseXml(requestBanner.responseText);
				var path = getPathName();

				path = path.replace(/\/[^\/]+\.shtml/, "");
                if (path.indexOf("/service-canada/") > -1){
                    path = path.replace(/^\//, "");
                    path = path.split("/");
                    var tmp = "";
                    for (var i in path) {
                        if (i < 3){
                            tmp = tmp + "/" + path[i];
                            i++;
                        }
                    }
                    path = tmp;

                }else{
                    path = path.replace(/^\//, "");
                    path = path.split("/");
                    var tmp = "";
                    for (var i in path) {
                        if (i < 2){
                            tmp = tmp + "/" + path[i];
                            i++;
                        }
                    }
                    path = tmp;
                }
              
				var elements = document.getElementsByClassName("app-name");
				elements[0].innerHTML = getBanner(path, xml);
			}
		}
		requestBanner.send();

	} */
});


/* function getBanner(pagePath, xml){
	var lang = "fr";
	if (getPathName().startsWith("/en/")){
		lang="en";
	}
				
	var banner = xml.getElementsByTagName("banner");
	
	var ret = $(".app-name").html(); //GET The DEFAULT BANNER MADE IN TEMPLATE
	for (i = 0; i < banner.length; i++) {
		var path = banner[i].getElementsByTagName("path")[0].getElementsByTagName(lang)[0].childNodes[0].textContent;		
		var title = banner[i].getElementsByTagName("title")[0].getElementsByTagName(lang)[0].childNodes[0].textContent;
		var landing_page = banner[i].getElementsByTagName("landing_page")[0].getElementsByTagName(lang)[0].childNodes[0].textContent;
		if(pagePath === path){	
			//<a href="http://esdc.prv/en/index.shtml"><span><abbr title="Employment and Social Development Canada / Service Canada"><span class="bold-gc">Labour Program</span> IntraWeb</abbr></span></a>

			ret = '<a href="https://esdc.prv/en/index.shtml"><span><abbr title="Employment and Social Development Canada / Service Canada"><span class="bold-gc">ESDC/SC</span> '+title+' IntraWeb</abbr></span></a>';
		}
	}
	return ret;
} */


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    
//END BREADCRUMBS

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function loadHTML(myDivId, url) {
    var xmlhttp;
    if (window.XMLHttpRequest) 
    {
        xmlhttp = new XMLHttpRequest();
    } 
    else 
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) 
        {
           if(xmlhttp.status == 200){
               document.getElementById(myDivId).innerHTML = xmlhttp.responseText;
               var allScripts = document.getElementById(myDivId).getElementsByTagName('script');
               for (var n = 0; n < allScripts .length; n++)
               {
                   eval(allScripts [n].innerHTML)//run script inside div generally not a good idea but these scripts are anyways intended to be executed.
               }
           }
           else {
               alert('Error');
           }
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addJS(path, script) {
	if (getPathName() === path){
		scripts.push(script);
	}
}

String.prototype.includes = function (str) {
  var returnValue = false;

  if (this.indexOf(str) !== -1) {
    returnValue = true;
  }

  return returnValue;
}
