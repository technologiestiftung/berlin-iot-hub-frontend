import { RecordType, DateValueType } from "../common/interfaces";

export const createDateValueArray = (input: RecordType[]) => {
  const dateValueArray = input.map((record: RecordType) => {
    return {
      value: record.value,
      date: new Date(record.recordedAt),
    };
  });
  return dateValueArray as DateValueType[];
};

export const createTimeOutput = (input: Date): string => {
  const hours = input.getUTCHours();
  const minutes = input.getUTCMinutes();
  const seconds = input.getUTCSeconds();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};
