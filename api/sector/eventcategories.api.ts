import { APIRequestContext } from '@playwright/test';

export class EventsCategoriesAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // 🔹 GET All Categories
  async getAllCategories(version: string, token: string) {
    return this.request.get(`/v${version}/events-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 🔹 GET Category By ID
  async getCategoryById(
    version: string,
    categoryId: string,
    token: string
  ) {
    return this.request.get(
      `/v${version}/events-categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 🔹 GET Events Under Category
  async getEventsByCategory(
    version: string,
    categoryId: string,
    token: string
  ) {
    return this.request.get(
      `/v${version}/events-categories/${categoryId}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // 🔹 GET Event By ID
  async getEventById(
    version: string,
    categoryId: string,
    eventId: string,
    token: string
  ) {
    return this.request.get(
      `/v${version}/events-categories/${categoryId}/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}