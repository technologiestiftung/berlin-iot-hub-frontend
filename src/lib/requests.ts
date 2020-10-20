import { DeviceType } from "../state/model";

export interface DeviceResponse {
  data: {
    devices: DeviceType[];
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

export interface Record {
  id: number;
  deviceId: number;
  recordedAt: string;
  value: number;
}
export interface RecordsResponse {
  data: {
    records: Record[];
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
