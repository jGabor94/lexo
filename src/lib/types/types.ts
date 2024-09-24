export type AnyObject = Record<string, any>

export type Email = `${string}@${string}`

export type ExpandObject<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
