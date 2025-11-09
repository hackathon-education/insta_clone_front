// src/api/saved.js
import { API_BASE } from "./http";

const pickToken = (tokenArg) =>
  tokenArg ??
  localStorage.getItem("accessToken") ??
  localStorage.getItem("token"); // 키 이름 둘 중 하나 쓰고 있다면

const authHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {});
const authCreds = (token) => (token ? "omit" : "include"); // JWT면 omit, 세션이면 include

export async function listSaved({ token } = {}) {
  const t = pickToken(token);
  const res = await fetch(`${API_BASE}/api/v1/saved`, {
    headers: {
      Accept: "application/json",
      ...authHeaders(t),
    },
    credentials: authCreds(t),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`listSaved failed: ${res.status} ${res.statusText} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data)
    ? data
        .map((s) => ({
          postId: s.postId ?? s.post_id ?? s.id ?? null,
          createdAt: s.createdAt ?? s.created_at ?? null,
        }))
        .filter((x) => !!x.postId)
    : [];
}

export async function savePost(postId, { token } = {}) {
  const t = pickToken(token);
  const res = await fetch(`${API_BASE}/api/v1/saved`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders(t),
    },
    credentials: authCreds(t),
    body: JSON.stringify({ postId }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`savePost failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json().catch(() => null);
}

export async function unsavePost(postId, { token } = {}) {
  const t = pickToken(token);
  const res = await fetch(`${API_BASE}/api/v1/saved/${encodeURIComponent(postId)}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...authHeaders(t),
    },
    credentials: authCreds(t),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`unsavePost failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json().catch(() => null);
}
