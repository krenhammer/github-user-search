export type Unpacked<T> = T extends (infer U)[] ? U : T;

export default Unpacked;
