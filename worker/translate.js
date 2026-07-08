/**
 * Cloudflare Worker — README Translate Proxy
 * ------------------------------------------------------------
 * Securely proxies translation requests to Tencent Cloud TMT (Text Machine
 * Translation) so the SecretId/SecretKey never touch the frontend.
 *
 * Deploy:
 *   npm i -g wrangler
 *   wrangler login
 *   wrangler secret put TENCENT_SECRET_ID
 *   wrangler secret put TENCENT_SECRET_KEY
 *   wrangler deploy
 *
 * Then set TRANSLATE_WORKER_URL in app.js to the deployed URL, e.g.
 *   https://ai-skills-translate.<your-subdomain>.workers.dev
 *
 * Frontend contract (POST JSON):
 *   { "text": "<english markdown/text>", "source": "en", "target": "zh" }
 * Response:
 *   { "translated": "<chinese text>" }
 */

const HOST = "tmt.tencentcloudapi.com";
const SERVICE = "tmt";
const REGION = "ap-guangzhou";
const ACTION = "TextTranslate";
const VERSION = "2018-03-21";

function hmac(key, msg) {
  return crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
}
async function importKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}
function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function sha256Hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return bufToHex(buf);
}

async function buildAuthorization(secretId, secretKey, timestamp, payloadStr) {
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const ct = "application/json; charset=utf-8";
  const payloadHash = await sha256Hex(payloadStr);
  const canonicalHeaders = `content-type:${ct}\nhost:${HOST}\n`;
  const signedHeaders = "content-type;host";
  const canonicalRequest =
    `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const canonicalHash = await sha256Hex(canonicalRequest);
  const credentialScope = `${date}/${SERVICE}/tc3_request`;
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${canonicalHash}`;

  const kDate = await importKey("TC3" + secretKey);
  const sDate = await hmac(kDate, date);
  const kService = await crypto.subtle.importKey("raw", sDate, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sService = await hmac(kService, SERVICE);
  const kSigning = await crypto.subtle.importKey("raw", sService, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signatureBuf = await hmac(kSigning, stringToSign);
  const signature = bufToHex(signatureBuf);

  return (
    `TC3-HMAC-SHA256 Credential=${secretId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`
  );
}

async function translate(text, secretId, secretKey) {
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({
    SourceText: text,
    Source: "en",
    Target: "zh",
    ProjectId: 0,
  });
  const auth = await buildAuthorization(secretId, secretKey, timestamp, payload);
  const headers = {
    Authorization: auth,
    "Content-Type": "application/json; charset=utf-8",
    Host: HOST,
    "X-TC-Action": ACTION,
    "X-TC-Version": VERSION,
    "X-TC-Region": REGION,
    "X-TC-Timestamp": String(timestamp),
  };
  const resp = await fetch(`https://${HOST}/`, {
    method: "POST",
    headers,
    body: payload,
  });
  const data = await resp.json();
  return (data.Response && data.Response.TargetText) || "";
}

export default {
  async fetch(request, env) {
    // CORS — allow the GitHub Pages origin to call this worker
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    const secretId = env.TENCENT_SECRET_ID;
    const secretKey = env.TENCENT_SECRET_KEY;
    if (!secretId || !secretKey) {
      return new Response(JSON.stringify({ error: "translation not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "invalid json" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const text = (body.text || "").toString().slice(0, 60000); // cap to protect quota
    if (!text.trim()) {
      return new Response(JSON.stringify({ translated: "" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const translated = await translate(text, secretId, secretKey);
      return new Response(JSON.stringify({ translated }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e) }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
