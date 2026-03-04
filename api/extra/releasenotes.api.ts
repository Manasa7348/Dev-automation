export class ReleaseNotesAPI {
  constructor(private request: any) {}

  // ─────────────────────────────
  // GET RELEASE NOTES
  // ─────────────────────────────
  async getReleaseNotes(token: string) {
    return await this.request.get(
      `/v1/ReleaseNotes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain'   // 🔥 Important (Swagger uses this)
        }
      }
    );
  }
}