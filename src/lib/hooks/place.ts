/* eslint-disable */
import type { Prisma, Place } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext } from '@zenstackhq/react/runtime';
import { type RequestOptions } from '@zenstackhq/react/runtime/swr';
import * as request from '@zenstackhq/react/runtime/swr';

export function usePlace() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/place/find`, `${endpoint}/place/aggregate`, `${endpoint}/place/count`, `${endpoint}/place/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.PlaceCreateArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.PlaceCreateArgs>, Prisma.CheckSelect<T, Place, Prisma.PlaceGetPayload<T>>>(`${endpoint}/place/create`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.PlaceCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.PlaceCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/place/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.PlaceFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.PlaceFindManyArgs>, options?: RequestOptions<Array<Prisma.PlaceGetPayload<T>>>) {
        return request.get<Array<Prisma.PlaceGetPayload<T>>>(`${endpoint}/place/findMany`, args, options);
    }

    function findUnique<T extends Prisma.PlaceFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceFindUniqueArgs>, options?: RequestOptions<Prisma.PlaceGetPayload<T>>) {
        return request.get<Prisma.PlaceGetPayload<T>>(`${endpoint}/place/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.PlaceFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceFindFirstArgs>, options?: RequestOptions<Prisma.PlaceGetPayload<T>>) {
        return request.get<Prisma.PlaceGetPayload<T>>(`${endpoint}/place/findFirst`, args, options);
    }

    async function update<T extends Prisma.PlaceUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.PlaceUpdateArgs>, Prisma.PlaceGetPayload<T>>(`${endpoint}/place/update`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.PlaceUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.PlaceUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/place/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.PlaceUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceUpsertArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.PlaceUpsertArgs>, Prisma.PlaceGetPayload<T>>(`${endpoint}/place/upsert`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.PlaceDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceDeleteArgs>) {
        try {
            return await request.del<Prisma.PlaceGetPayload<T>>(`${endpoint}/place/delete`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.PlaceDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.PlaceDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/place/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.PlaceAggregateArgs>(args: Prisma.Subset<T, Prisma.PlaceAggregateArgs>, options?: RequestOptions<Prisma.GetPlaceAggregateType<T>>) {
        return request.get<Prisma.GetPlaceAggregateType<T>>(`${endpoint}/place/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.PlaceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.PlaceGroupByArgs['orderBy'] } : { orderBy?: Prisma.PlaceGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.PlaceGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ?
            Array<Prisma.PickArray<Prisma.PlaceGroupByOutputType, T['by']> &
                {
                    [P in ((keyof T) & (keyof Prisma.PlaceGroupByOutputType))]: P extends '_count'
                    ? T[P] extends boolean
                    ? number
                    : Prisma.GetScalarType<T[P], Prisma.PlaceGroupByOutputType[P]>
                    : Prisma.GetScalarType<T[P], Prisma.PlaceGroupByOutputType[P]>
                }
            > : InputErrors>) {
        return request.get<{} extends InputErrors ?
            Array<Prisma.PickArray<Prisma.PlaceGroupByOutputType, T['by']> &
                {
                    [P in ((keyof T) & (keyof Prisma.PlaceGroupByOutputType))]: P extends '_count'
                    ? T[P] extends boolean
                    ? number
                    : Prisma.GetScalarType<T[P], Prisma.PlaceGroupByOutputType[P]>
                    : Prisma.GetScalarType<T[P], Prisma.PlaceGroupByOutputType[P]>
                }
            > : InputErrors>(`${endpoint}/place/groupBy`, args, options);
    }

    function count<T extends Prisma.PlaceCountArgs>(args: Prisma.Subset<T, Prisma.PlaceCountArgs>, options?: RequestOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.PlaceCountAggregateOutputType> : number>) {
        return request.get<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.PlaceCountAggregateOutputType> : number>(`${endpoint}/place/count`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy, count };
}
