export type XOR<T, U> = T | U extends object ? (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never }) : T | U;
