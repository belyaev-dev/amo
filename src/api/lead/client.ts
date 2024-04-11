import type { JSONValue, Order, With } from "../../typings/utility.ts";
import type {
  RequestAddComplex,
  RequestAddLead,
  RequestUpdateLead,
  ResponseAddComplex,
  ResponseAddLeads,
  ResponseGetLeadById,
  ResponseGetLeads,
  ResponseLeadSubscriptionById,
  ResponseUpdateLead,
  ResponseUpdateLeads,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { query } from "../../helpers/query.ts";
import type { FilterLike } from "../../helpers/filter.ts";

export class LeadApi extends Endpoint {
  /** Метод позволяет получить список сделок в аккаунте. */
  getLeads(params?: {
    with?: With<
      ["catalog_elements", "is_price_modified_by_robot", "loss_reason", "contacts", "only_deleted", "source_id"]
    >;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<
      ["id", "name", "pipeline_id", "created_by", "updated_by", "responsible_user_id"],
      ["id", "name", "pipeline_id", "created_by", "updated_by", "responsible_user_id"],
      ["price", "created_at", "updated_at", "closed_at", "closest_task_at"],
      number,
      number
    >;
    order?: Order<["created_at", "updated_at", "id"]>;
  }): Promise<ResponseGetLeads> {
    return this.rest.get<ResponseGetLeads>({
      url: "/api/v4/leads",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретной сделки по ID. */
  getLeadById(id: number, params?: {
    with?: With<
      ["catalog_elements", "is_price_modified_by_robot", "loss_reason", "contacts", "only_deleted", "source_id"]
    >;
  }): Promise<ResponseGetLeadById> {
    return this.rest.get<ResponseGetLeadById>({
      url: `/api/v4/leads/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять сделки в аккаунт пакетно. */
  addLeads(leads: RequestAddLead[]): Promise<ResponseAddLeads> {
    return this.rest.post<ResponseAddLeads>({
      url: "/api/v4/leads",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет редактировать сделки пакетно. */
  updateLeads(leads: RequestUpdateLead[]): Promise<ResponseUpdateLeads> {
    return this.rest.patch<ResponseUpdateLeads>({
      url: "/api/v4/leads",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретной сделки по ID. */
  updateLeadById(id: number, lead: RequestUpdateLead): Promise<ResponseUpdateLead> {
    return this.rest.patch<ResponseUpdateLead>({
      url: `/api/v4/leads/${id}`,
      payload: lead as JSONValue,
    });
  }

  /** Метод позволяет добавлять сделки c контактом и компанией в аккаунт пакетно. Добавляемые данные могут быть проверены в контроле дублей. */
  addComplex(leads: RequestAddComplex[]): Promise<ResponseAddComplex[]> {
    return this.rest.post<ResponseAddComplex[]>({
      url: "/api/v4/leads/complex",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет получить подписчиков конкретной сущности. */
  getLeadSubscriptionById(lead_id: number, params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseLeadSubscriptionById> {
    return this.rest.get<ResponseLeadSubscriptionById>({
      url: `/api/v4/leads/${lead_id}/subscriptions`,
      query: query(params),
    });
  }
}
