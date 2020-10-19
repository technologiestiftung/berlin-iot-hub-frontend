import { DeviceType } from "../state/model";

export interface DeviceResponse {
  data: {
    devices: Array<DeviceType>;
  };
}

export async function getDevices(url: string): Promise<DeviceResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch device");
  }
  const json = (await response.json()) as DeviceResponse;
  return json;
}

export interface RecordsResponse {
  data: {
    records: Array<{
      id: number;
      deviceId: number;
      recordedAt: string;
      value: number;
    }>;
  };
}

export async function getRecords(url: string): Promise<RecordsResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch device");
  }
  const json = (await response.json()) as RecordsResponse;
  return json;
}
