export default {
	async fetch(request, env, ctx) {
		let target = env.TARGET ?? "";
		if (!target.startsWith("http")) {
			return new Response("Not Found", { status: 404 });
		}
		if (target.endsWith("/")) {
			target = target.substring(0, target.length - 1);
		}
		const url = new URL(request.url);
		const newReq = new Request(target + url.pathname + url.search, { body: request.body, method: request.method, headers: request.headers, redirect: "follow" });
		return fetch(newReq);
	},
};
