/* eslint-disable */
import type { Prisma, Waypoint } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext } from '@zenstackhq/react/runtime';
import { type RequestOptions } from '@zenstackhq/react/runtime/swr';
import * as request from '@zenstackhq/react/runtime/swr';

export function useWaypoint() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/waypoint/find`, `${endpoint}/waypoint/aggregate`, `${endpoint}/waypoint/count`, `${endpoint}/waypoint/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.WaypointCreateArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.WaypointCreateArgs>, Prisma.CheckSelect<T, Waypoint, Prisma.WaypointGetPayload<T>>>(`${endpoint}/waypoint/create`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.WaypointCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.WaypointCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/waypoint/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.WaypointFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.WaypointFindManyArgs>, options?: RequestOptions<Array<Prisma.WaypointGetPayload<T>>>) {
        return request.get<Array<Prisma.WaypointGetPayload<T>>>(`${endpoint}/waypoint/findMany`, args, options);
    }

    function findUnique<T extends Prisma.WaypointFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointFindUniqueArgs>, options?: RequestOptions<Prisma.WaypointGetPayload<T>>) {
        return request.get<Prisma.WaypointGetPayload<T>>(`${endpoint}/waypoint/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.WaypointFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointFindFirstArgs>, options?: RequestOptions<Prisma.WaypointGetPayload<T>>) {
        return request.get<Prisma.WaypointGetPayload<T>>(`${endpoint}/waypoint/findFirst`, args, options);
    }

    async function update<T extends Prisma.WaypointUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.WaypointUpdateArgs>, Prisma.WaypointGetPayload<T>>(`${endpoint}/waypoint/update`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.WaypointUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.WaypointUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/waypoint/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.WaypointUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointUpsertArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.WaypointUpsertArgs>, Prisma.WaypointGetPayload<T>>(`${endpoint}/waypoint/upsert`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.WaypointDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.WaypointDeleteArgs>) {
        try {
            return await request.del<Prisma.WaypointGetPayload<T>>(`${endpoint}/waypoint/delete`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.WaypointDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.WaypointDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/waypoint/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.WaypointAggregateArgs>(args: Prisma.Subset<T, Prisma.WaypointAggregateArgs>, options?: RequestOptions<Prisma.GetWaypointAggregateType<T>>) {
        return request.get<Prisma.GetWaypointAggregateType<T>>(`${endpoint}/waypoint/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.WaypointGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.WaypointGroupByArgs['orderBy'] } : { orderBy?: Prisma.WaypointGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.WaypointGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetWaypointGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetWaypointGroupByPayload<T> : InputErrors>(`${endpoint}/waypoint/groupBy`, args, options);
    }

    function count<T extends Prisma.WaypointCountArgs>(args: Prisma.Subset<T, Prisma.WaypointCountArgs>, options?: RequestOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.WaypointCountAggregateOutputType> : number>) {
        return request.get<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.WaypointCountAggregateOutputType> : number>(`${endpoint}/waypoint/count`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy, count };
}
