import type { Boardgame } from '$lib/types'
import * as v from 'valibot'
import { CollectionSchema, type CollectionChildren, type CollectionItem } from './schema'

export type CollectionResponse = { games: Omit<Boardgame, 'stats'>[]; totalAmount: number }

const wrongFormat = (text: string) => {
	return new Error('Wrong format: ' + text)
}

export const parseBggCollectionResponse = (ast: object): CollectionResponse => {
	const result = v.safeParse(CollectionSchema, ast)
	if (!result.success) {
		throw wrongFormat('Invalid format')
	}

	const games = result.output.items.children.map((it) => it.item).map(convertItem)

	return { games, totalAmount: Number(result.output.items.totalitems) }
}

const convertItem = (item: CollectionItem): CollectionResponse['games'][number] => {
	const name = findFromChildren(item.children, 'name')
	const image = findFromChildren(item.children, 'image')

	if (name.length === 0 || image.length === 0) {
		throw wrongFormat('Missing required fields')
	}

	return {
		id: item.objectid,
		name: name[0].content,
		image: image[0].content
	}
}

type KeysOfUnion<T> = T extends T ? keyof T : never

const findFromChildren = <T extends CollectionChildren, K extends KeysOfUnion<T>>(
	array: T[],
	key: K
): T extends { [key in K]: unknown } ? T[K][] : [] => {
	return array
		.filter((it) => it !== undefined)
		.filter((it) => key in it)
		.map((it) => it as Record<K, T>)
		.map((it) => it[key]) as any
}
