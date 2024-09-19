export default {
	async fetch(request, env, ctx) {
		let routes = env.ROUTES ? env.ROUTES.split(",") : [];
		// 解析成 [[source,target]..]这样的二维数组
		routes = routes.map(i => i.split("="));
		const url = new URL(request.url);
		for (let [source, target] of routes) {
			if (source == url.hostname) {
				if (!target.match(/^https?:\/\//)) {
					target = "https://" + target;
				}
				if (target.endsWith("/")) {
					target = target.substring(0, target.length - 1);
				}
				console.log(`FORWARD ${request.method} ${source} => ${target}`);
				const newReq = new Request(target + url.pathname + url.search, { body: request.body, method: request.method, headers: request.headers, redirect: "follow" });
				return fetch(newReq);
			}
		}
		return new Response("Not Found.", { status: 404 });
	},
};
