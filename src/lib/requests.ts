export interface DeviceResponse {
  data: {
    devices: {
      id: number;
      ttnDeviceId: string;
      ttnAppId: string;
      description: string;
    };
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
