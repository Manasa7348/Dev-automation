export class UserDashboardAPI {
  constructor(private request: any) {}

  // ─────────────────────────────
  // USERS - GET ALL
  // ─────────────────────────────
  async getAllUsers(token: string) {
    return await this.request.get(
      `/v1/Users/GetAllUsers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      }
    );
  }

  // ─────────────────────────────
  // DASHBOARD DETAILS
  // ─────────────────────────────
  async getDashboardDetails(employerId: string, token: string) {
    return await this.request.get(
      `/v1/employers/${employerId}/dashboard-details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'text/plain'   // 🔥 Important (Swagger uses this)
        }
      }
    );
  }

  // ─────────────────────────────
  // DASHBOARD LOGOS
  // ─────────────────────────────
  async getDashboardLogos(employerId: string, token: string) {
    return await this.request.get(
      `/v1/employers/${employerId}/dashboard-details/logos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json'
        }
      }
    );
  }
}