const path = require("path");
const fs = require("fs");
let config = {
	port: "8029",
};
const configfile = path.join(__dirname, "./config.json");
if (fs.existsSync(configfile)) {
	const t = fs.readFileSync(configfile, "utf8");
	config = JSON.parse(t);
} else {
	fs.writeFileSync(configfile, JSON.stringify(config));
}
switch (process.argv[2]) {
	case "serve":
		{
			const express = require("express");
			const port = config.port;
			const app = new express();
			// app.get("/*", (req, res) => {
			//     console.log(req.originalUrl)
			// })
			app.get("*/imgmotes/i/*", (req, res) => {
				res.setHeader("Content-Type", "text/plain");
				const imgmotename = req.originalUrl
					.toLowerCase()
					.replace("//imgmotes", "")
					.replace("/imgmotes", "")
					.replace("/i/", "")
					.replace("i/", "");
				if (imgmotename === "") {
					res.sendStatus(400);
					return;
				}
				//	console.log(`Plugin: IMGMOTES\t\t\t --> Requested: '${imgmotename}'`);
				let returnable = "/assets/imgmote/";
				if (
					fs.existsSync(
						path.join(
							__dirname,
							"../../cynthiaFiles/assets/imgmote/",
							`${imgmotename}.gif`,
						),
					)
				) {
					returnable = returnable + `${imgmotename}.gif`;
				} else if (
					fs.existsSync(
						path.join(
							__dirname,
							"../../cynthiaFiles/assets/imgmote/",
							`${imgmotename}.webp`,
						),
					)
				) {
					returnable = returnable + `${imgmotename}.webp`;
				} else if (
					fs.existsSync(
						path.join(
							__dirname,
							"../../cynthiaFiles/assets/imgmote/",
							`${imgmotename}.png`,
						),
					)
				) {
					returnable = returnable + `${imgmotename}.png`;
				} else if (
					fs.existsSync(
						path.join(
							__dirname,
							"../../cynthiaFiles/assets/imgmote/",
							`${imgmotename}.svg`,
						),
					)
				) {
					returnable = returnable + `${imgmotename}.svg`;
				} else {
					console.log(
						path.join(
							__dirname,
							"../../cynthiaFiles/assets/imgmote/",
							`${imgmotename}.* does not exist...`,
						),
					);
					res.send("Not Found");
					return;
				}
				res.send(returnable);
			});
			app.listen(port, () => {
				console.log(
					`Plugin: IMGMOTES\t\t\t --> listening on port ${port}, proxied through Cynthia!`,
				);
			});
		}
		break;
	case "embed": {
		const js = fs
			.readFileSync(path.join(__dirname, "./web.js"), {
				encoding: "utf8",
				flag: "r",
			})
			.toString();
		console.log(`${process.argv[3]}<script>
            ${js}
            </script>`);
	}
}

