import type { AccountInfo } from "../../typings/entities.ts";
import type { Links } from "../../typings/utility.ts";

export type ResponseGetAccountInfo = AccountInfo & Links & {
  _embedded: {
    amojo_rights: {
      can_direct: boolean;
      can_create_groups: boolean;
    };
    users_groups: {
      id: number;
      name: string;
      uuid?: string | null;
    }[];
    task_types: {
      id: number;
      name: string;
      color: string | null;
      icon_id: number | null;
      code: string;
    }[];
    datetime_settings: {
      date_pattern: string;
      short_date_pattern: string;
      short_time_pattern: string;
      date_format: string;
      time_format: string;
      timezone: string;
      timezone_offset: string;
    };
  };
  entity_names: Record<
    string,
    Record<string, {
      gender: "m" | "f";
      singular_form: Partial<{
        dative: string;
        default: string;
        genitive: string;
        accusative: string;
        instrumental: string;
        prepositional: string;
      }>;
      plural_form: Partial<{
        dative: string;
        default: string;
        genitive: string;
        accusative: string;
        instrumental: string;
        prepositional: string;
      }>;
    }>
  >;
};
