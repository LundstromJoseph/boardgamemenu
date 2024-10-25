import * as v from 'valibot'

export const NameSchema = v.object({
	name: v.object({
		content: v.string()
	})
})

export const ImageSchema = v.object({
	image: v.object({
		content: v.string()
	})
})

export const CollectionChildrenSchema = v.fallback(v.union([NameSchema, ImageSchema, v.undefined()]), undefined)

export type CollectionChildren = v.InferInput<typeof CollectionChildrenSchema>

export const CollectionItemSchema = v.object({
	children: v.pipe(
		v.array(CollectionChildrenSchema),
		v.filterItems((item) => item !== undefined)
	),
	objectid: v.string()
})

export type CollectionItem = v.InferInput<typeof CollectionItemSchema>

export const CollectionSchema = v.object({
	items: v.object({
		children: v.array(
			v.object({
				item: CollectionItemSchema
			})
		),
		totalitems: v.string()
	})
})
