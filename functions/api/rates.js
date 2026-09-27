export async function onRequestGet(context) {
    // Fetch rates from Cloudflare KV
    const data = await context.env.RATES_KV.get("rates");
    
    return new Response(data || "[]", {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    try {
        // Parse the incoming updated rates from the Admin panel
        const body = await context.request.json();
        
        // Save to Cloudflare KV
        await context.env.RATES_KV.put("rates", JSON.stringify(body));
        
        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to save data" }), { 
            status: 500 
        });
    }
}