/* eslint-disable */
import type { Prisma, Journey } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext } from '@zenstackhq/react/runtime';
import { type RequestOptions } from '@zenstackhq/react/runtime/swr';
import * as request from '@zenstackhq/react/runtime/swr';

export function useJourney() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/journey/find`, `${endpoint}/journey/aggregate`, `${endpoint}/journey/count`, `${endpoint}/journey/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.JourneyCreateArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.JourneyCreateArgs>, Prisma.CheckSelect<T, Journey, Prisma.JourneyGetPayload<T>>>(`${endpoint}/journey/create`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.JourneyCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.JourneyCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/journey/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.JourneyFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.JourneyFindManyArgs>, options?: RequestOptions<Array<Prisma.JourneyGetPayload<T>>>) {
        return request.get<Array<Prisma.JourneyGetPayload<T>>>(`${endpoint}/journey/findMany`, args, options);
    }

    function findUnique<T extends Prisma.JourneyFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyFindUniqueArgs>, options?: RequestOptions<Prisma.JourneyGetPayload<T>>) {
        return request.get<Prisma.JourneyGetPayload<T>>(`${endpoint}/journey/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.JourneyFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyFindFirstArgs>, options?: RequestOptions<Prisma.JourneyGetPayload<T>>) {
        return request.get<Prisma.JourneyGetPayload<T>>(`${endpoint}/journey/findFirst`, args, options);
    }

    async function update<T extends Prisma.JourneyUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.JourneyUpdateArgs>, Prisma.JourneyGetPayload<T>>(`${endpoint}/journey/update`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.JourneyUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.JourneyUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/journey/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.JourneyUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyUpsertArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.JourneyUpsertArgs>, Prisma.JourneyGetPayload<T>>(`${endpoint}/journey/upsert`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.JourneyDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.JourneyDeleteArgs>) {
        try {
            return await request.del<Prisma.JourneyGetPayload<T>>(`${endpoint}/journey/delete`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.JourneyDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.JourneyDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/journey/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.JourneyAggregateArgs>(args: Prisma.Subset<T, Prisma.JourneyAggregateArgs>, options?: RequestOptions<Prisma.GetJourneyAggregateType<T>>) {
        return request.get<Prisma.GetJourneyAggregateType<T>>(`${endpoint}/journey/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.JourneyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.JourneyGroupByArgs['orderBy'] } : { orderBy?: Prisma.JourneyGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.JourneyGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetJourneyGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetJourneyGroupByPayload<T> : InputErrors>(`${endpoint}/journey/groupBy`, args, options);
    }

    function count<T extends Prisma.JourneyCountArgs>(args: Prisma.Subset<T, Prisma.JourneyCountArgs>, options?: RequestOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.JourneyCountAggregateOutputType> : number>) {
        return request.get<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.JourneyCountAggregateOutputType> : number>(`${endpoint}/journey/count`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy, count };
}
