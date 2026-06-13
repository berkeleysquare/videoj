export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Add debug headers to all responses
    const addDebugHeaders = (response) => {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Worker-Called', 'true');
      newResponse.headers.set('X-Worker-Path', url.pathname);
      return newResponse;
    };

    // Serve R2 bucket assets from /media/* route
    if (url.pathname.startsWith("/media/")) {
      try {
        // Remove /media/ prefix to get the actual R2 object key
        const objectKey = url.pathname.slice(7); // removes "/media/"
        const isDataAsset = objectKey.startsWith('assets/data/');
        
        // Get object from R2 bucket
        const object = await env.R2_BUCKET.get(objectKey);
        
        if (object === null) {
          const notFoundResponse = new Response("Object Not Found in R2", { status: 404 });
          return addDebugHeaders(notFoundResponse);
        }

        // Set appropriate headers
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set(
          "cache-control",
          isDataAsset ? "no-cache, must-revalidate" : "public, max-age=86400"
        );
        headers.set('X-Worker-Called', 'true');
        headers.set('X-Worker-Path', url.pathname);

        return new Response(object.body, {
          headers,
        });
      } catch (error) {
        const errorResponse = new Response("Error fetching object: " + error.message, { status: 500 });
        return addDebugHeaders(errorResponse);
      }
    }

    // API routes
    if (url.pathname.startsWith("/api/")) {
      const apiResponse = Response.json({
        name: "Cloudflare",
        message: "API is working",
        path: url.pathname,
        timestamp: new Date().toISOString()
      });
      return addDebugHeaders(apiResponse);
    }

    // Serve static assets (React app) - with manual SPA handling
    const staticResponse = await env.ASSETS.fetch(request);
    
    // If asset not found and it's not an API or media route, serve index.html for SPA
    if (staticResponse.status === 404 && 
        !url.pathname.startsWith("/api/") && 
        !url.pathname.startsWith("/media/") &&
        !url.pathname.includes('.')) {
      // Serve index.html for client-side routing
      const indexRequest = new Request(new URL('/', request.url), request);
      const indexResponse = await env.ASSETS.fetch(indexRequest);
      return addDebugHeaders(indexResponse);
    }
    
    return addDebugHeaders(staticResponse);
  },
}
