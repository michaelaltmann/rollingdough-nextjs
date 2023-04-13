/* eslint-disable */
import type { Prisma, Bakery } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext } from '@zenstackhq/react/runtime';
import { type RequestOptions } from '@zenstackhq/react/runtime/swr';
import * as request from '@zenstackhq/react/runtime/swr';

export function useBakery() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/bakery/find`, `${endpoint}/bakery/aggregate`, `${endpoint}/bakery/count`, `${endpoint}/bakery/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.BakeryCreateArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.BakeryCreateArgs>, Prisma.CheckSelect<T, Bakery, Prisma.BakeryGetPayload<T>>>(`${endpoint}/bakery/create`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.BakeryCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.BakeryCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/bakery/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.BakeryFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.BakeryFindManyArgs>, options?: RequestOptions<Array<Prisma.BakeryGetPayload<T>>>) {
        return request.get<Array<Prisma.BakeryGetPayload<T>>>(`${endpoint}/bakery/findMany`, args, options);
    }

    function findUnique<T extends Prisma.BakeryFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryFindUniqueArgs>, options?: RequestOptions<Prisma.BakeryGetPayload<T>>) {
        return request.get<Prisma.BakeryGetPayload<T>>(`${endpoint}/bakery/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.BakeryFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryFindFirstArgs>, options?: RequestOptions<Prisma.BakeryGetPayload<T>>) {
        return request.get<Prisma.BakeryGetPayload<T>>(`${endpoint}/bakery/findFirst`, args, options);
    }

    async function update<T extends Prisma.BakeryUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.BakeryUpdateArgs>, Prisma.BakeryGetPayload<T>>(`${endpoint}/bakery/update`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.BakeryUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.BakeryUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/bakery/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.BakeryUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryUpsertArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.BakeryUpsertArgs>, Prisma.BakeryGetPayload<T>>(`${endpoint}/bakery/upsert`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.BakeryDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.BakeryDeleteArgs>) {
        try {
            return await request.del<Prisma.BakeryGetPayload<T>>(`${endpoint}/bakery/delete`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.BakeryDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.BakeryDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/bakery/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.BakeryAggregateArgs>(args: Prisma.Subset<T, Prisma.BakeryAggregateArgs>, options?: RequestOptions<Prisma.GetBakeryAggregateType<T>>) {
        return request.get<Prisma.GetBakeryAggregateType<T>>(`${endpoint}/bakery/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.BakeryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.BakeryGroupByArgs['orderBy'] } : { orderBy?: Prisma.BakeryGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.BakeryGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetBakeryGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetBakeryGroupByPayload<T> : InputErrors>(`${endpoint}/bakery/groupBy`, args, options);
    }

    function count<T extends Prisma.BakeryCountArgs>(args: Prisma.Subset<T, Prisma.BakeryCountArgs>, options?: RequestOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.BakeryCountAggregateOutputType> : number>) {
        return request.get<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.BakeryCountAggregateOutputType> : number>(`${endpoint}/bakery/count`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy, count };
}
