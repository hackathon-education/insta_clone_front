import React, { useEffect, useState } from "react";
import { API_BASE } from "../../api/http";

function SavedMinimal() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const token =
          localStorage.getItem("accessToken") || localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/v1/saved`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: token ? "omit" : "include",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`${res.status} ${res.statusText} ${text}`);
        }

        const data = await res.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setErr(e.message || "failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="saved-list">저장 목록 불러오는 중…</div>;
  if (err) return <div className="saved-list">불러오기 실패: {err}</div>;
  if (!items.length) return <div className="saved-list">저장한 게시물이 없습니다.</div>;

  return (
    <div className="saved-list" style={{ display: "grid", gap: 12 }}>
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 12,
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            rowGap: 6,
            columnGap: 12,
            alignItems: "center",
            background: "#fff",
          }}
        >
          <div style={{ fontWeight: 600, color: "#374151" }}>postId</div>
          <div style={{ color: "#111827" }}>{it.postId}</div>

          <div style={{ fontWeight: 600, color: "#374151" }}>userId</div>
          <div style={{ color: "#111827" }}>{it.userId}</div>

          <div style={{ fontWeight: 600, color: "#374151" }}>createdAt</div>
          <div style={{ color: "#111827" }}>
            {it.createdAt
              ? new Date(it.createdAt).toLocaleString()
              : "-"}
          </div>

          <div style={{ fontWeight: 600, color: "#374151" }}>id</div>
          <div style={{ color: "#6b7280" }}>{it.id}</div>
        </div>
      ))}
    </div>
  );
}

export default SavedMinimal;
