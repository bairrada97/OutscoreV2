


export default function () {
	const date = new Date();  
	date.setTime(date.getTime() + (365*24*60*60*1000));
	let expires = "; expires=" + date.toUTCString();

 		const nuxtApp = useNuxtApp();
	const setCookie = (cname, cvalue) => ( document.cookie = cname + "=" + (cvalue || "")  + expires + "; path=/");
;

	const getCookie = cname => {
		
		let name = cname + "=";
		let cookie;
		if ( nuxtApp.ssrContext) {
			if ( nuxtApp.ssrContext.req.headers.cookie) {
				cookie =  nuxtApp.ssrContext.req.headers.cookie.split(";");
			} else {
				return "";
			}
		}
		// if client
		if (process.client) cookie = document.cookie.split(";");
	 
	
		for (let i = 0; i < cookie.length; i++) {
			let c = cookie[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};

	const checkCookie = (cname, cvalue) => {
		let cookie = getCookie(cname);
		if (cookie != "") {
			return cookie;
		} else {
			setCookie(cname, cvalue);
		}
	};

	return {
		setCookie,
		getCookie,
		checkCookie
	};
}
