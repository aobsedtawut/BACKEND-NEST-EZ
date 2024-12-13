const RATE_LIMIT = 5; // Maximum requests per second
const RATE_LIMIT_PERIOD = 1000; // Time window in milliseconds (1 second)

async function handleRequest(request, env) {
	const customerId = getCustomerIdFromRequest(request);
	if (!customerId) {
		return new Response('Customer ID is required', { status: 400 });
	}

	const currentTimestamp = Date.now();
	const customerKey = `rate_limit_${customerId}`;

	// Fetch data from KV
	let data = await env.RATE_LIMIT_KV.get(customerKey, { type: 'json' });

	if (!data) {
		// If no previous data, initialize
		data = { count: 1, firstRequestTimestamp: currentTimestamp };
		await env.RATE_LIMIT_KV.put(customerKey, JSON.stringify(data), { expirationTtl: Math.ceil(RATE_LIMIT_PERIOD / 1000) });
		return new Response('Request allowed', { status: 200 });
	}

	const elapsedTime = currentTimestamp - data.firstRequestTimestamp;

	if (elapsedTime > RATE_LIMIT_PERIOD) {
		// Reset count if time window passed
		data = { count: 1, firstRequestTimestamp: currentTimestamp };
		await env.RATE_LIMIT_KV.put(customerKey, JSON.stringify(data), { expirationTtl: Math.ceil(RATE_LIMIT_PERIOD / 1000) });
		return new Response('Request allowed', { status: 200 });
	}

	// Increment request count
	data.count++;

	if (data.count > RATE_LIMIT) {
		// Deny request if rate limit exceeded
		return new Response('Rate limit exceeded', { status: 429 });
	}

	// Update KV
	await env.RATE_LIMIT_KV.put(customerKey, JSON.stringify(data), { expirationTtl: Math.ceil(RATE_LIMIT_PERIOD / 1000) });

	return new Response('Request allowed', { status: 200 });
}

function getCustomerIdFromRequest(request) {
	const url = new URL(request.url);
	const customerId = url.searchParams.get('customerId'); // Assuming customerId is in query params
	return customerId;
}

export default {
	async fetch(request, env) {
		return handleRequest(request, env);
	},
};
