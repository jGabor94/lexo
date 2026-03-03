"server only"

import { auth } from "@/features/authentication/lib/auth";
import { Permissions } from "@/features/authorization/types";
import { hasPermission } from "@/features/authorization/utils";
import { AnyObject, DeepExpand } from "@/types";
import { DrizzleQueryError } from "drizzle-orm";
import { Session } from "next-auth";
import { cache } from "react";
import z from "zod";
import { AuthenticationError, AuthorizationError, createErrorReturn, createSuccessReturn, DalErrorReturn, DalSuccessReturn, InitReturns, ZodInputError, ZodOutputError } from "./types";



interface CreateReturn<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = AnyObject,
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {
    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(fn: (ctx: Ctx) => Promise<T>): (...args: I extends undefined ? [] : I) => Promise<Returns[number] | T>
    authenticate(): AuthenticateReturn<[...Returns, DalErrorReturn<AuthenticationError>], DeepExpand<Ctx & { user: Session["user"] }>, I, O>,
    schema<TInput extends z.ZodTuple<{ [K in keyof I]: z.ZodType<I[K]> }, any> | undefined = undefined, TOutput extends z.ZodType | undefined = undefined>(schema?: {
        input?: TInput,
        output?: TOutput
    }): SchemaReturn<[...Returns, TInput extends z.ZodTuple ? DalErrorReturn<ZodInputError> : never, TOutput extends z.ZodType ? DalErrorReturn<ZodOutputError> : never], Ctx, I, TOutput>
    $Input<TInput extends any[] = []>(): $InputReturn<Returns, DeepExpand<Ctx & { input: TInput }>, TInput, O>
}

interface $InputReturn<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = AnyObject,
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {
    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(fn: (ctx: Ctx) => Promise<T>): (...args: I extends undefined ? [] : I) => Promise<Returns[number] | T>
    authenticate(): AuthenticateReturn<[...Returns, DalErrorReturn<AuthenticationError>], DeepExpand<Ctx & { user: Session["user"] }>, I, O>,
    schema<TInput extends z.ZodTuple<{ [K in keyof I]: z.ZodType<I[K]> }, any> | undefined = undefined, TOutput extends z.ZodType | undefined = undefined>(schema?: {
        input?: TInput,
        output?: TOutput
    }): SchemaReturn<[...Returns, TInput extends z.ZodTuple ? DalErrorReturn<ZodInputError> : never, TOutput extends z.ZodType ? DalErrorReturn<ZodOutputError> : never], Ctx, I, TOutput>
}

interface SchemaReturn<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = AnyObject,
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {
    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(fn: (ctx: Ctx) => Promise<T>): (...args: I extends undefined ? [] : I) => Promise<Returns[number] | T>
    authenticate(): AuthenticateReturn<[...Returns, DalErrorReturn<AuthenticationError>], DeepExpand<Ctx & { user: Session["user"] }>, I, O>,
}

interface AuthenticateReturn<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = AnyObject,
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {
    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(fn: (ctx: Ctx) => Promise<T>): (...args: I extends undefined ? [] : I) => Promise<Returns[number] | T>
    authorize<Resource extends keyof Permissions>(cfg: {
        resource: Resource,
        action: Permissions[Resource]["action"],
        data?: Permissions[Resource]["dataType"] | ((...args: I) => Promise<Permissions[Resource]["dataType"] | undefined>),
    }): AuthorizeReturn<[...Returns, DalErrorReturn<AuthorizationError>], Ctx, I, O>
}

interface AuthorizeReturn<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = AnyObject,
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {
    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(fn: (ctx: Ctx) => Promise<T>): (...args: I extends undefined ? [] : I) => Promise<Returns[number] | T>
}

export class Dal<
    Returns extends any[] = InitReturns,
    Ctx extends AnyObject = {},
    I extends any[] = [],
    O extends z.ZodType | undefined = undefined
> {

    private authentication = false
    private authorization: {
        resource: keyof Permissions;
        action: any;
        data?: any | ((...args: any[]) => Promise<any>);
    } | false = false

    private cfg: { cache?: boolean } | undefined = undefined
    private inputSchema: z.ZodTuple | undefined = undefined
    private outputSchema: z.ZodType | undefined = undefined

    private constructor(cfg?: { cache?: boolean }) {
        this.cfg = cfg
    }

    static create(cfg: { cache?: boolean } = { cache: true }): CreateReturn {
        return new Dal(cfg)
    }

    schema<TInput extends z.ZodTuple<{ [K in keyof I]: z.ZodType<I[K]> }, any> | undefined = undefined, TOutput extends z.ZodType | undefined = undefined>(schema?: {
        input?: TInput,
        output?: TOutput
    }) {

        this.inputSchema = schema?.input
        this.outputSchema = schema?.output

        return this as SchemaReturn<
            [...Returns, TInput extends z.ZodTuple ? DalErrorReturn<ZodInputError> : never, TOutput extends z.ZodType ? DalErrorReturn<ZodOutputError> : never],
            Ctx,
            I,
            TOutput>
    }

    $Input<TInput extends any[] = []>() {
        return this as unknown as $InputReturn<
            Returns,
            DeepExpand<Ctx & { input: TInput }>,
            TInput,
            O
        >
    }

    authenticate() {
        this.authentication = true
        return this as unknown as AuthenticateReturn<[...Returns, DalErrorReturn<AuthenticationError>], DeepExpand<Ctx & { user: Session["user"] }>, I, O>
    }

    authorize<Resource extends keyof Permissions>(cfg: {
        resource: Resource,
        action: Permissions[Resource]["action"],
        data?: Permissions[Resource]["dataType"] | ((...args: I extends z.ZodTuple ? z.input<I> : never) => Promise<Permissions[Resource]["dataType"] | undefined>),
    }) {
        this.authorization = cfg
        return this as AuthorizeReturn<[...Returns, DalErrorReturn<AuthorizationError>], Ctx, I, O>
    }

    operation<const T extends DalErrorReturn | (O extends undefined ? DalSuccessReturn : DalSuccessReturn<z.output<O>>) | void>(
        fn: (ctx: Ctx) => Promise<T>
    ) {


        const final = async (...args: I extends undefined ? [] : I): Promise<Returns[number] | T> => {
            console.log(args)
            try {
                if (this.inputSchema) {
                    try {
                        this.inputSchema.parse(args)
                    }
                    catch (error) {
                        if (error instanceof z.ZodError) {
                            return createErrorReturn({ type: "zod-input-error", error })
                        }
                    }
                }

                let session

                if (this.authentication) {
                    session = await auth()
                    if (!session) return createErrorReturn({ type: "unauthenticated" })

                    if (this.authorization) {
                        let dataResult
                        if (typeof this.authorization.data === "function") {
                            const res = await (this.authorization?.data)(...args)
                            if (!res) return createErrorReturn({ type: "unauthorized" })
                            dataResult = res
                        } else {
                            dataResult = this.authorization.data
                        }
                        if (!hasPermission(session.user, this.authorization.resource, this.authorization.action, dataResult)) {
                            return createErrorReturn({ type: "unauthorized" })
                        }
                    }

                    const res = await fn({ user: session.user, input: args } as unknown as Ctx)

                    if (res) {
                        if (!res.success) return res

                        if (this.outputSchema) {
                            try {
                                this.outputSchema.parse(res.data)
                            } catch (error) {
                                if (error instanceof z.ZodError) {
                                    return createErrorReturn({ type: "zod-output-error", error })
                                }
                            }
                        }

                        return createSuccessReturn(res.data)
                    }




                }

            } catch (error) {
                if ((error as any).message === "NEXT_REDIRECT") throw error;
                if (error instanceof DrizzleQueryError) {
                    console.error("Drizzle Query Error:", error)
                    return createErrorReturn({ type: "drizzle-error", error: error })
                }
                if (error instanceof z.ZodError) {
                    console.error("Zod error:", error)
                    return createErrorReturn({ type: "validation-error", error: error })
                }
                console.error("Unknown error:", error)
                return createErrorReturn({ type: "unexpected-error", error: error })
            }


        }

        return this.cfg?.cache ? cache(final) : final

    }
}








/*

export function dal<
    E,
    TArgs extends z.ZodTuple,
    Resource extends keyof Permissions,
    TRedirect extends Config.redirect,
    O extends IsParameterProvided<TAuthentication> extends true
    ? (data: { input: z.input<TArgs>, user: Session["user"] }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> | DalErrorReturn<any> : E>
    : (data: { input: z.input<TArgs> }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> | DalErrorReturn<any> : E>,
    TReturn extends z.ZodType | undefined = undefined,
    TAuthentication extends true | undefined = undefined,
>(
    config: {
        schema?: {
            input?: TArgs,
            output?: TReturn
        },
        authentication?: TAuthentication,
        authorization: {
            resource: Resource,
            action: Permissions[Resource]["action"],
            data?: Permissions[Resource]["dataType"] | ((...args: z.input<TArgs>) => Promise<Permissions[Resource]["dataType"] | undefined>),
        },
        errorRedirect?: Exact<NonNullable<TRedirect>, Config.redirect>
    },
    operation: O
): (...args: z.input<TArgs>) => Promise<ReturnType<O>
    | (TRedirect extends { fallback: true | string } ? never : FallbackErrors)
    | DalErrorReturn<{ type: "unauthorized" }>
    | (IsParameterProvided<TAuthentication> extends true ? TRedirect extends { authentication: true | string } ? never : DalErrorReturn<{ type: "unauthenticated" }> : never)>

export function dal<
    E,
    TArgs extends z.ZodTuple,
    Resource extends keyof Permissions,
    TRedirect extends Config.redirect,
    O extends IsParameterProvided<TAuthentication> extends true
    ? (data: { input: z.input<TArgs>, user: Session["user"] }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> | DalErrorReturn<any> : E>
    : (data: { input: z.input<TArgs> }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> | DalErrorReturn<any> : E>,
    TReturn extends z.ZodType | undefined = undefined,
    TAuthentication extends true | undefined = undefined,
>(
    config: {
        schema?: {
            input?: TArgs,
            output?: TReturn
        },
        authentication?: TAuthentication,
        errorRedirect?: Exact<NonNullable<TRedirect>, Config.redirect>
    },
    operation: O
): (...args: z.input<TArgs>) => Promise<ReturnType<O>
    | (TRedirect extends { fallback: true | string } ? never : FallbackErrors)
    | (IsParameterProvided<TAuthentication> extends true ? TRedirect extends { authentication: true | string } ? never : DalErrorReturn<{ type: "unauthenticated" }> : never)>


export function dal<
    E,
    TArgs extends z.ZodTuple,
    Resource extends keyof Permissions,
    TRedirect extends Config.redirect,
    TReturn extends z.ZodType | undefined = undefined,
    TAuthentication extends true | undefined = undefined,

>(
    config: {
        schema?: {
            input?: TArgs,
            output?: TReturn
        },
        authentication?: TAuthentication,
        authorization?: {
            resource: Resource,
            action: Permissions[Resource]["action"],
            data?: Permissions[Resource]["dataType"] | ((...args: z.input<TArgs>) => Promise<Permissions[Resource]["dataType"]>),
        },
        errorRedirect?: Exact<NonNullable<TRedirect>, Config.redirect>
    },
    operation: 
) {

    const { schema } = config
    return {
        create: (operation: IsParameterProvided<TAuthentication> extends true
            ? (data: { input: z.input<TArgs>, user: Session["user"] }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> : E>
            : (data: { input: z.input<TArgs> }) => Promise<IsParameterProvided<TReturn> extends true ? z.output<TReturn> : E>) => (cache(async (...args: z.input<TArgs>) => {
                try {

                    if (schema?.input) schema.input.parse(args)

                    let session

                    if (config.authentication) {
                        session = await auth()
                        if (!session) {
                            if (config.errorRedirect?.authentication) {
                                redirect(typeof config.errorRedirect.authentication === "boolean" ? defaultRedirectConfig.authentication : config.errorRedirect.authentication)
                            } else {
                                return createErrorReturn({ type: "unauthenticated" })
                            }
                        }

                        if (config.authorization) {
                            let dataResult
                            if (typeof config.authorization.data === "function") {
                                const res = await (config.authorization?.data as () => Promise<Permissions[Resource]["dataType"]>)()
                                if (!res) createErrorReturn({ type: "not-found", error: "Authorization data not found" })
                                dataResult = res
                            } else {
                                dataResult = config.authorization.data
                            }
                            if (!hasPermission(session.user, config.authorization.resource, config.authorization.action, dataResult)) {

                                if (config.errorRedirect?.authorization) {
                                    redirect(typeof config.errorRedirect.authorization === "boolean" ? defaultRedirectConfig.authorization : config.errorRedirect.authorization)
                                } else {
                                    return createErrorReturn({ type: "unauthorized" })
                                }
                            }
                        }
                    }

                    const result = await operation({ input: [...args], ...config.authentication && { user: session?.user } as any })

                    if (schema?.output) schema.output.parse(result)


                    return result
                } catch (e) {
                    if ((e as any).message === "NEXT_REDIRECT") throw e;
                    if (config.errorRedirect?.fallback) {
                        redirect(typeof config.errorRedirect.fallback === "boolean" ? defaultRedirectConfig.fallback : config.errorRedirect.fallback)
                    }
                    if (e instanceof ThrowableDalError) {
                        console.error("Custom dal error:", e)
                        return createErrorReturn(e.error)
                    }
                    if (e instanceof DrizzleQueryError) {
                        console.error("Drizzle Query Error:", e)
                        return createErrorReturn({ type: "drizzle-error", error: e })
                    }
                    if (e instanceof z.ZodError) {
                        console.error("Zod error:", e)
                        return createErrorReturn({ type: "validation-error", error: e })
                    }
                    console.error("Unknown error:", e)
                    return createErrorReturn({ type: "unexpected-error", error: e })
                }
            }) as any)
    } 
}



*/