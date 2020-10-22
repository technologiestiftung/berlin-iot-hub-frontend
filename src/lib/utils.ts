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
