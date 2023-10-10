import readline from "readline";

const API_TOKEN = "";
const ACCOUNT_ID = "";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const llama2 = (prompt) =>
	fetch(
		`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`,
		{
			headers: { Authorization: `Bearer ${API_TOKEN}` },
			body: JSON.stringify({ prompt }),
			method: "POST",
		}
	);

if (process.argv[2]) {
	console.log(
		(await (await llama2(process.argv.slice(2).join(" "))).json()).result
			.response
	);
} else {
	rl.setPrompt("_? ");
	rl.prompt();
	rl.on("line", async (line) => {
		const response = (await (await llama2(line)).json()).result.response;
		console.log(response);
	});
}