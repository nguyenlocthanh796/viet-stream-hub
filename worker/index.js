// ponytail: regex bóc m3u8 cơ bản; nâng cấp sang AST/headless browser nếu trang mã hóa packer phức tạp.
export default {
  async fetch(req) {
    const url = new URL(req.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    };

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    const targetUrl = url.searchParams.get("url");
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Thieu param ?url=" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }

    try {
      if (url.pathname === "/proxy") {
        const res = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": new URL(targetUrl).origin
          }
        });
        const newHeaders = new Headers(res.headers);
        Object.entries(cors).forEach(([k, v]) => newHeaders.set(k, v));
        return new Response(res.body, { status: res.status, headers: newHeaders });
      }

      // Endpoint mac dinh: /resolve
      const htmlRes = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": new URL(targetUrl).origin
        }
      });
      const text = await htmlRes.text();

      // Bắt link .m3u8 hoặc source media trong HTML/script
      const match = text.match(/https?:\/\/[^"'\s\\]+?\.m3u8[^"'\s\\]*/i);
      if (!match) {
        return new Response(JSON.stringify({ error: "Khong tim thay luong m3u8" }), {
          status: 404,
          headers: { ...cors, "Content-Type": "application/json" }
        });
      }

      const streamUrl = match[0].replace(/\\/g, "");
      if (url.searchParams.get("redirect") === "true") {
        return Response.redirect(streamUrl, 302);
      }

      return new Response(JSON.stringify({ status: "success", stream: streamUrl }), {
        headers: { ...cors, "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
  }
};
