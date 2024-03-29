import vibe.vibe;

void main()
{
	auto settings = new HTTPServerSettings;
	settings.port = 80;
	//settings.bindAddresses = ["::1", "127.0.0.1"];

	auto route = new URLRouter; 

	route.get("/", &hello);
	route.get("/newdesign", &startNew);
	route.get("*", serveStaticFiles("public/"));


	listenHTTP(settings, route);
	
	logInfo("Please open http://127.0.0.1:80/ in your browser.");
	runApplication();
}

void startNew(HTTPServerRequest req, HTTPServerResponse res)
{
	res.render!("newdesign.dt");
}
///Root, home page.
void hello(HTTPServerRequest req, HTTPServerResponse res)	
{
	res.render!("index.dt", req);
}
