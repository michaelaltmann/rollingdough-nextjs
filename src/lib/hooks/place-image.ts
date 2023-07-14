/* eslint-disable */
import type { Prisma, PlaceImage } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext } from '@zenstackhq/react/runtime';
import { type RequestOptions } from '@zenstackhq/react/runtime/swr';
import * as request from '@zenstackhq/react/runtime/swr';

export function usePlaceImage() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/placeImage/find`, `${endpoint}/placeImage/aggregate`, `${endpoint}/placeImage/count`, `${endpoint}/placeImage/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.PlaceImageCreateArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.PlaceImageCreateArgs>, Prisma.CheckSelect<T, PlaceImage, Prisma.PlaceImageGetPayload<T>>>(`${endpoint}/placeImage/create`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.PlaceImageCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.PlaceImageCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/placeImage/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.PlaceImageFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.PlaceImageFindManyArgs>, options?: RequestOptions<Array<Prisma.PlaceImageGetPayload<T>>>) {
        return request.get<Array<Prisma.PlaceImageGetPayload<T>>>(`${endpoint}/placeImage/findMany`, args, options);
    }

    function findUnique<T extends Prisma.PlaceImageFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageFindUniqueArgs>, options?: RequestOptions<Prisma.PlaceImageGetPayload<T>>) {
        return request.get<Prisma.PlaceImageGetPayload<T>>(`${endpoint}/placeImage/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.PlaceImageFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageFindFirstArgs>, options?: RequestOptions<Prisma.PlaceImageGetPayload<T>>) {
        return request.get<Prisma.PlaceImageGetPayload<T>>(`${endpoint}/placeImage/findFirst`, args, options);
    }

    async function update<T extends Prisma.PlaceImageUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.PlaceImageUpdateArgs>, Prisma.PlaceImageGetPayload<T>>(`${endpoint}/placeImage/update`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.PlaceImageUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.PlaceImageUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/placeImage/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.PlaceImageUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageUpsertArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.PlaceImageUpsertArgs>, Prisma.PlaceImageGetPayload<T>>(`${endpoint}/placeImage/upsert`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.PlaceImageDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.PlaceImageDeleteArgs>) {
        try {
            return await request.del<Prisma.PlaceImageGetPayload<T>>(`${endpoint}/placeImage/delete`, args, mutate);
        } catch (err: any) {
            if (err.info?.prisma && err.info?.code === 'P2004' && err.info?.reason === 'RESULT_NOT_READABLE') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.PlaceImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.PlaceImageDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/placeImage/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.PlaceImageAggregateArgs>(args: Prisma.Subset<T, Prisma.PlaceImageAggregateArgs>, options?: RequestOptions<Prisma.GetPlaceImageAggregateType<T>>) {
        return request.get<Prisma.GetPlaceImageAggregateType<T>>(`${endpoint}/placeImage/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.PlaceImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.PlaceImageGroupByArgs['orderBy'] } : { orderBy?: Prisma.PlaceImageGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.PlaceImageGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ?
            Array<Prisma.PickArray<Prisma.PlaceImageGroupByOutputType, T['by']> &
                {
                    [P in ((keyof T) & (keyof Prisma.PlaceImageGroupByOutputType))]: P extends '_count'
                    ? T[P] extends boolean
                    ? number
                    : Prisma.GetScalarType<T[P], Prisma.PlaceImageGroupByOutputType[P]>
                    : Prisma.GetScalarType<T[P], Prisma.PlaceImageGroupByOutputType[P]>
                }
            > : InputErrors>) {
        return request.get<{} extends InputErrors ?
            Array<Prisma.PickArray<Prisma.PlaceImageGroupByOutputType, T['by']> &
                {
                    [P in ((keyof T) & (keyof Prisma.PlaceImageGroupByOutputType))]: P extends '_count'
                    ? T[P] extends boolean
                    ? number
                    : Prisma.GetScalarType<T[P], Prisma.PlaceImageGroupByOutputType[P]>
                    : Prisma.GetScalarType<T[P], Prisma.PlaceImageGroupByOutputType[P]>
                }
            > : InputErrors>(`${endpoint}/placeImage/groupBy`, args, options);
    }

    function count<T extends Prisma.PlaceImageCountArgs>(args: Prisma.Subset<T, Prisma.PlaceImageCountArgs>, options?: RequestOptions<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.PlaceImageCountAggregateOutputType> : number>) {
        return request.get<T extends { select: any; } ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Prisma.PlaceImageCountAggregateOutputType> : number>(`${endpoint}/placeImage/count`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy, count };
}
