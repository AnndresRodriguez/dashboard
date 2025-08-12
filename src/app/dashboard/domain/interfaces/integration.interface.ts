export interface IntegrationData {
  id: string;
  application: string;
  logo: string;
  type: string;
  rate: number;
  profit: number;
  isSelected?: boolean;
}

export interface IntegrationListResponse {
  integrations: IntegrationData[];
}

export interface IntegrationApiResponse {
  data: IntegrationListResponse;
}
