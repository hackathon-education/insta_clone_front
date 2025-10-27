import { httpGet, httpPost, httpDelete } from "./http";

// 1) 게시물 저장
export async function savePost(postId) {
  return httpPost("/api/v1/saved", { postId });
}

// 2) 게시물 저장 해제
export async function unsavePost(postId) {
  // 서버 명세: /api/v1/saved/{postId} + body {postId}
  return httpDelete(`/api/v1/saved/${encodeURIComponent(postId)}`, { postId });
}

// 3) 저장된 게시물 조회 (id, userId, postId, createdAt 배열)
export async function listSaved() {
  return httpGet("/api/v1/saved");
}
