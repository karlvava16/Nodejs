import { Request } from 'express';

export type ParamsAndBodyType<T1, T2> = Request<T1, {}, T2, {}>;
export type ParamsAndQueryType<T1, T2> = Request<T1, {}, {}, T2>;
export type ParamsType<T1> = Request<T1>;
export type BodyType<T1> = Request<{}, {}, T1>;
